"use server";

import { generatePropertyCaptions as generate } from "@/lib/gemini";

export async function generatePropertyCaptions(formData: FormData) {
  const imageBase64 = formData.get("image") as string;
  const propertyInfo = {
    type: formData.get("type") as string,
    rooms: formData.get("rooms") as string,
    features: formData.get("features") as string,
    tone: formData.get("tone") as string,
  };

  if (!imageBase64) {
    throw new Error("Imagem é obrigatória.");
  }

  try {
    const captions = await generate(imageBase64, propertyInfo);
    return { success: true, captions };
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return { success: false, error: error.message };
  }
}
