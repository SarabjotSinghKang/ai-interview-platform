const calculateAnswerScore = (answer, idealAnswer) => {
  const cleanedAnswer = answer.trim().toLowerCase();
  const cleanedIdealAnswer = idealAnswer.trim().toLowerCase();

  if (!cleanedAnswer) {
    return 0;
  }

  const answerWords = new Set(
    cleanedAnswer.split(/\s+/).filter(Boolean)
  );

  const idealWords = cleanedIdealAnswer
    .split(/\s+/)
    .filter((word) => word.length > 3);

  const matchedWords = idealWords.filter((word) =>
    answerWords.has(word)
  );

  const keywordScore =
    idealWords.length > 0
      ? matchedWords.length / idealWords.length
      : 0;

  const lengthScore = Math.min(cleanedAnswer.length / 250, 1);

  const finalScore =
    keywordScore * 7 + lengthScore * 3;

  return Math.min(10, Math.max(1, Math.round(finalScore)));
};

export const evaluateInterviewAnswers = async (interview) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const evaluatedQuestions = interview.questions.map((question) => {
    const score = calculateAnswerScore(
      question.userAnswer,
      question.idealAnswer
    );

    const strengths = [];
    const weaknesses = [];
    const suggestions = [];

    if (score >= 7) {
      strengths.push(
        "The answer covers several important concepts."
      );
    }

    if (question.userAnswer.length >= 120) {
      strengths.push(
        "The answer provides a reasonable level of detail."
      );
    } else {
      weaknesses.push(
        "The answer could include more explanation and supporting detail."
      );
    }

    if (score < 6) {
      weaknesses.push(
        "Some important concepts from the ideal answer are missing."
      );

      suggestions.push(
        "Review the core concept and explain it using a practical example."
      );
    } else {
      suggestions.push(
        "Add a practical example to make the answer stronger."
      );
    }

    return {
      score,
      strengths,
      weaknesses,
      suggestions,
    };
  });

  const totalScore = evaluatedQuestions.reduce(
    (sum, result) => sum + result.score,
    0
  );

  const overallScore =
    evaluatedQuestions.length > 0
      ? Number(
          (
            totalScore / evaluatedQuestions.length
          ).toFixed(1)
        )
      : 0;

  return {
    evaluatedQuestions,
    overallScore,
    overallFeedback: {
      summary:
        overallScore >= 7
          ? "You demonstrated a good understanding of the interview topics."
          : "You have a basic understanding, but several answers need more depth and precision.",

      strengths:
        overallScore >= 7
          ? [
              "Good coverage of core concepts",
              "Reasonably clear explanations",
            ]
          : [
              "Attempted all interview questions",
              "Demonstrated some understanding of the selected technologies",
            ],

      areasForImprovement: [
        "Use more precise technical terminology",
        "Include practical examples",
        "Structure answers more clearly",
      ],

      recommendedTopics:
        interview.technologies.length > 0
          ? interview.technologies
          : [interview.jobRole],
    },
  };
};