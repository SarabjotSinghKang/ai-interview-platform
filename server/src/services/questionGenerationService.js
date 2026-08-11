const questionBank = {
  react: [
    {
      questionText:
        "What is the difference between props and state in React?",
      category: "technical",
      difficulty: "easy",
      idealAnswer:
        "Props are read-only values passed from a parent component, while state is internal data managed by a component and can change over time.",
    },
    {
      questionText:
        "Explain how the Virtual DOM works in React.",
      category: "technical",
      difficulty: "medium",
      idealAnswer:
        "React creates a lightweight representation of the real DOM. When state changes, React compares the new Virtual DOM with the previous version and updates only the changed parts of the real DOM.",
    },
    {
      questionText:
        "What is the purpose of the useEffect hook?",
      category: "technical",
      difficulty: "medium",
      idealAnswer:
        "useEffect handles side effects such as API calls, subscriptions, timers, and manually interacting with the DOM after a component renders.",
    },
    {
      questionText:
        "What is the difference between controlled and uncontrolled components?",
      category: "technical",
      difficulty: "medium",
      idealAnswer:
        "Controlled components store form values in React state, while uncontrolled components allow the DOM to manage the values and are usually accessed using refs.",
    },
    {
      questionText:
        "How can you improve performance in a React application?",
      category: "technical",
      difficulty: "hard",
      idealAnswer:
        "Performance can be improved using React.memo, useMemo, useCallback, code splitting, lazy loading, efficient state management, and avoiding unnecessary renders.",
    },
  ],

  node: [
    {
      questionText:
        "What is Node.js and why is it useful for backend development?",
      category: "technical",
      difficulty: "easy",
      idealAnswer:
        "Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows JavaScript to run outside the browser and is useful for scalable, event-driven backend applications.",
    },
    {
      questionText:
        "Explain the event loop in Node.js.",
      category: "technical",
      difficulty: "medium",
      idealAnswer:
        "The event loop allows Node.js to perform non-blocking operations by moving asynchronous tasks to the system and executing their callbacks when the call stack is free.",
    },
    {
      questionText:
        "What is middleware in Express?",
      category: "technical",
      difficulty: "easy",
      idealAnswer:
        "Middleware is a function that runs during the request-response cycle and can access the request, response, and next function.",
    },
    {
      questionText:
        "What is the difference between authentication and authorization?",
      category: "technical",
      difficulty: "medium",
      idealAnswer:
        "Authentication verifies who a user is, while authorization determines what that authenticated user is allowed to access.",
    },
    {
      questionText:
        "How would you secure an Express API?",
      category: "technical",
      difficulty: "hard",
      idealAnswer:
        "An Express API can be secured using HTTPS, validation, authentication, authorization, rate limiting, secure headers, CORS restrictions, password hashing, and safe error handling.",
    },
  ],

  mongodb: [
    {
      questionText:
        "What is MongoDB and how is it different from a relational database?",
      category: "technical",
      difficulty: "easy",
      idealAnswer:
        "MongoDB is a document database that stores BSON documents. Unlike relational databases, it does not require fixed tables and rows and supports flexible schemas.",
    },
    {
      questionText:
        "What is a MongoDB document?",
      category: "technical",
      difficulty: "easy",
      idealAnswer:
        "A MongoDB document is a BSON object containing key-value pairs. It is similar to a JSON object and represents one record in a collection.",
    },
    {
      questionText:
        "What is the purpose of indexes in MongoDB?",
      category: "technical",
      difficulty: "medium",
      idealAnswer:
        "Indexes improve query performance by allowing MongoDB to locate documents without scanning every document in the collection.",
    },
    {
      questionText:
        "What is the difference between embedding and referencing in MongoDB?",
      category: "technical",
      difficulty: "medium",
      idealAnswer:
        "Embedding stores related data inside the same document, while referencing stores related documents separately and connects them using ObjectIds.",
    },
    {
      questionText:
        "When would you use MongoDB transactions?",
      category: "technical",
      difficulty: "hard",
      idealAnswer:
        "Transactions are useful when several database operations must either all succeed or all fail, such as transferring money between accounts.",
    },
  ],

  javascript: [
    {
      questionText:
        "What is the difference between let, const, and var?",
      category: "technical",
      difficulty: "easy",
      idealAnswer:
        "var is function-scoped and can be redeclared, while let and const are block-scoped. let can be reassigned, while const cannot be reassigned.",
    },
    {
      questionText:
        "Explain promises and async/await in JavaScript.",
      category: "technical",
      difficulty: "medium",
      idealAnswer:
        "Promises represent the eventual result of an asynchronous operation. async/await provides cleaner syntax for working with promises.",
    },
    {
      questionText:
        "What is a closure in JavaScript?",
      category: "technical",
      difficulty: "medium",
      idealAnswer:
        "A closure occurs when a function remembers and can access variables from its outer scope even after the outer function has completed.",
    },
    {
      questionText:
        "What is event delegation?",
      category: "technical",
      difficulty: "medium",
      idealAnswer:
        "Event delegation attaches one event listener to a parent element and handles events from its children using event bubbling.",
    },
    {
      questionText:
        "Explain the difference between shallow copy and deep copy.",
      category: "technical",
      difficulty: "hard",
      idealAnswer:
        "A shallow copy duplicates only the top-level properties, while nested objects remain shared. A deep copy duplicates all nested structures independently.",
    },
  ],

  behavioral: [
    {
      questionText:
        "Tell me about a challenging project you worked on and how you handled it.",
      category: "behavioral",
      difficulty: "medium",
      idealAnswer:
        "A strong answer should describe the situation, task, actions taken, and measurable result using the STAR method.",
    },
    {
      questionText:
        "Describe a time when you had to learn a new technology quickly.",
      category: "behavioral",
      difficulty: "medium",
      idealAnswer:
        "The answer should explain why the technology was needed, how the candidate learned it, how it was applied, and what result was achieved.",
    },
    {
      questionText:
        "How do you handle disagreements with teammates?",
      category: "behavioral",
      difficulty: "medium",
      idealAnswer:
        "A good answer should demonstrate listening, respectful communication, focus on project goals, and willingness to find a practical compromise.",
    },
    {
      questionText:
        "Tell me about a mistake you made and what you learned from it.",
      category: "behavioral",
      difficulty: "medium",
      idealAnswer:
        "The candidate should take responsibility, explain the corrective action, and show how the lesson prevented the mistake from happening again.",
    },
    {
      questionText:
        "How do you prioritize tasks when working under a deadline?",
      category: "behavioral",
      difficulty: "medium",
      idealAnswer:
        "The answer should mention assessing urgency and impact, breaking work into smaller tasks, communicating risks, and tracking progress.",
    },
  ],
};

const normalizeTechnology = (technology) => {
  const value = technology.toLowerCase();

  if (value.includes("react")) return "react";
  if (value.includes("node") || value.includes("express")) return "node";
  if (value.includes("mongo")) return "mongodb";
  if (value.includes("javascript") || value === "js") return "javascript";

  return null;
};

const getQuestionPool = (interview) => {
  const questions = [];

  for (const technology of interview.technologies) {
    const key = normalizeTechnology(technology);

    if (key && questionBank[key]) {
      questions.push(...questionBank[key]);
    }
  }

  if (
    interview.interviewType === "behavioral" ||
    interview.interviewType === "mixed"
  ) {
    questions.push(...questionBank.behavioral);
  }

  if (questions.length === 0) {
    questions.push(
      ...questionBank.javascript,
      ...questionBank.behavioral
    );
  }

  return questions;
};

const shuffleQuestions = (questions) => {
  return [...questions].sort(() => Math.random() - 0.5);
};

export const generateInterviewQuestions = async (interview) => {
  // Simulates a small AI response delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const questionPool = getQuestionPool(interview);

  const matchingDifficulty = questionPool.filter(
    (question) =>
      question.difficulty === interview.difficulty
  );

  const preferredQuestions =
    matchingDifficulty.length >= interview.numberOfQuestions
      ? matchingDifficulty
      : questionPool;

  const selectedQuestions = shuffleQuestions(preferredQuestions).slice(
    0,
    interview.numberOfQuestions
  );

  if (selectedQuestions.length < interview.numberOfQuestions) {
    throw new Error(
      "Not enough mock questions are available for this interview"
    );
  }

  return selectedQuestions;
};