import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAuXGFYFLkw-QffZ4SDtPM2hnFmQISjQ3k" });

export const POST = async (req: NextRequest) => {
    const { query } = await req.json()

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
        config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
        }
    });

    const result = response.text

    return NextResponse.json({ message: result }, { status: 200 })
}