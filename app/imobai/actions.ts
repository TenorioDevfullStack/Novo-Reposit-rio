"use server";

import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const genAI = new GoogleGenerativeAI(apiKey);

// Função auxiliar para converter a imagem de data URL para o formato da API
function dataUrlToGenerativePart(dataUrl: string): Part {
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Formato de data URL inválido");
  }
  const mimeType = matches[1];
  const base64Data = matches[2];

  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

export async function generatePropertyCaptions(formData: FormData) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });

    const imageBase64 = formData.get("image") as string;
    const propertyType = formData.get("type");
    const rooms = formData.get("rooms");
    const features = formData.get("features");
    const tone = formData.get("tone");

    if (!imageBase64 || !propertyType || !rooms || !features || !tone) {
      return { success: false, error: "Todos os campos são obrigatórios." };
    }

    const imagePart = dataUrlToGenerativePart(imageBase64);

    const prompt = `
      Você é um especialista em marketing imobiliário. Crie 3 opções de legendas para um post de rede social sobre um imóvel.
      Instruções:
      1. Use o tom de voz: "${tone}".
      2. Incorpore as informações: Tipo: ${propertyType}, Dormitórios: ${rooms}, Destaques: ${features}.
      3. Analise a imagem para extrair detalhes visuais e adicioná-los à legenda.
      4. Formate a saída em Markdown com títulos (Opção 1, 2, 3), parágrafos, listas de emojis e hashtags.
    `;

    const result = await model.generateContent([prompt, imagePart]);
    return { success: true, captions: result.response.text() };
  } catch (error) {
    console.error("Error generating captions:", error);
    return {
      success: false,
      error: "Falha ao se comunicar com a IA. Verifique sua chave de API.",
    };
  }
}
