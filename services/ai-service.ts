import { SYSTEM_INSTRUCTION_TEMPLATE } from '@/constants/instructions'
import { GetAdviceParams } from '@/types/prompt'
import {
  ContentListUnion,
  GenerateContentConfig,
  GoogleGenAI,
} from '@google/genai'

const model = 'gemini-2.5-flash-lite'

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY })

const config: GenerateContentConfig = {
  thinkingConfig: { thinkingBudget: 0 },
  systemInstruction: [{ text: SYSTEM_INSTRUCTION_TEMPLATE }],
}

export const aiService = {
  async generateAdvice(params: GetAdviceParams) {
    const contents: ContentListUnion = [
      { role: 'user', parts: [{ text: params.inputText }] },
    ]

    try {
      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      })

      return response?.candidates?.[0]?.content?.parts?.[0]?.text
    } catch (error) {
      return 'Não foi possível gerar a resposta. Tente novamente mais tarde'
    }
  },
}
