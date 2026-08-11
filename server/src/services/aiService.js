import Groq from "groq-sdk";


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});


export async function generateInterviewQuestions(interview) {

    const prompt = `
You are an expert technical interviewer.

Generate exactly ${interview.numberOfQuestions} interview questions.

Role:
${interview.jobRole}

Interview Type:
${interview.interviewType}

Experience:
${interview.experienceLevel}

Difficulty:
${interview.difficulty}

Technologies:
${interview.technologies.join(", ")}

Return ONLY valid JSON.

Format:

[
  {
    "questionText": "...",
    "idealAnswer": "...",
    "difficulty": "medium",
    "category": "technical"
  }
]

Do not use markdown.
Do not add explanations.
Return only JSON.
`;


    const response = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [
            {
                role: "user",
                content: prompt
            }
        ],

        temperature: 0.7
    });


    const text = response.choices[0].message.content.trim();
    console.log("========== GROQ RESPONSE ==========");
console.log(text);
console.log("===================================");


   try {
    return JSON.parse(text);
} catch (error) {
    console.error("JSON Parse Error:", error);
    console.log("Raw Response:");
    console.log(text);
    throw error;
}

}