import { GoogleGenAI } from "@google/genai";

export async function getEcoAdvice(
  calculatorData: any,
  completedChallenges: any[],
  score: number
) {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not set.");
      return "يرجى ضبط مفتاح API الخاص بـ Gemini للحصول على نصائح ذكية.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
      أنت مستشار بيئي ذكي لمنصة "أرض أخضر".
      قم بتحليل بيانات المستخدم التالية وقدم نصيحة مخصصة واحدة قصيرة وعملية (لا تزيد عن 30 كلمة) لتحسين أثره البيئي.
      
      بيانات المستخدم:
      - نقاط الحاسبة الكربونية: ${JSON.stringify(calculatorData)}
      - التحديات المكتملة: ${JSON.stringify(completedChallenges)}
      - النقاط الحالية: ${score}

      ركز على نقاط الضعف (مثل استهلاك الكهرباء العالي أو عدم إكمال تحديات معينة).
      خاطب المستخدم بصيغة المشجع والناصح.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating AI advice:", error);
    return "حدث خطأ أثناء الاتصال بالمستشار الذكي. حاول مرة أخرى لاحقاً.";
  }
}
