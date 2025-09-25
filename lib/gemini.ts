import { GoogleGenAI } from "@google/genai"; 

const ai = new GoogleGenAI({ apiKey: "AIzaSyAuXGFYFLkw-QffZ4SDtPM2hnFmQISjQ3k" });

export const askGemini = async (message: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
        }
    });

    const result = response.text

    return result
}
