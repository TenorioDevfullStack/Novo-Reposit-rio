import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates marketing captions for a property.
 * @param imageBase64 The property image in base64 format.
 * @param propertyData Basic data about the property.
 * @returns A list of generated captions.
 */
export async function generatePropertyCaptions(
  imageBase64: string,
  propertyData: {
    type: string;
    rooms: string;
    features: string;
    tone: string;
  }
) {
  const prompt = `
    Você é um especialista em marketing imobiliário de luxo. 
    Com base na imagem do imóvel em anexo e nos dados abaixo, gere 3 opções de legendas cativantes para o Instagram.
    
    DADOS DO IMÓVEL:
    - Tipo: ${propertyData.type}
    - Quartos/Suítes: ${propertyData.rooms}
    - Destaques: ${propertyData.features}
    - Tom de voz desejado: ${propertyData.tone}
    
    INSTRUÇÕES:
    1. A primeira opção deve ser focada em estilo de vida e emoção.
    2. A segunda opção deve ser focada em detalhes técnicos e valor de mercado.
    3. A terceira opção deve ser curta, direta e com foco em urgência/call to action.
    4. Use emojis relevantes e hashtags estratégicas do setor imobiliário brasileiro.
    5. O idioma deve ser Português do Brasil.
  `;

  // Remove the data URL prefix if it exists
  const base64Content = imageBase64.replace(/^data:image\/\w+;base64,/, "");

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: base64Content,
        mimeType: "image/png", // Defaulting to png, can be dynamic
      },
    },
  ]);

  const response = await result.response;
  return response.text();
}
