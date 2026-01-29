"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

type Message = {
  role: "user" | "model";
  parts: string;
};

type ChatResult = {
  success: boolean;
  text?: string;
  error?: string;
};

export async function chatWithGemini(
  messages: Message[],
  userMessage: string
): Promise<ChatResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    return {
      success: false,
      error: "GEMINI_API_KEY não configurada.",
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const history = messages.map((message) => ({
      role: message.role,
      parts: [{ text: message.parts }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userMessage);

    return {
      success: true,
      text: result.response.text(),
    };
  } catch (error) {
    console.error("Erro ao consultar o Gemini:", error);
    return {
      success: false,
      error: "Falha ao se comunicar com o Gemini.",
    };
  }
}
