import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAuXGFYFLkw-QffZ4SDtPM2hnFmQISjQ3k" });

export const askGemini = async (message: string) => {
    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: `
             Be concise.    
            ${message}
            `,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0, // Disables thinking
                },
            }
        });

        const result = response.text

        return result
    } catch (error) {
        return "An Error occured"
    }
}
