import api from "./api.js";



export const getMyInterviews = async () => {
  const response = await api.get("/interviews");
  return response.data;
};

export const createInterview = async (interviewData) => {
  const response = await api.post(
    "/interviews",
    interviewData
  );

  return response.data;
};

export const generateInterviewQuestions = async (
  interviewId
) => {
  const response = await api.post(
    `/interviews/${interviewId}/generate-questions`
  );

  return response.data;
};

export const getInterviewById = async (id) => {
  const response = await api.get(`/interviews/${id}`);

  return response.data;
};

export const startInterview = async (interviewId) => {
  const response = await api.post(
    `/interviews/${interviewId}/start`
  );

  return response.data;
};

export const saveInterviewAnswer = async (
  interviewId,
  questionId,
  answer
) => {
  const response = await api.patch(
    `/interviews/${interviewId}/questions/${questionId}/answer`,
    {
      answer,
    }
  );

  return response.data;
};

export const completeInterview = async (interviewId) => {
  const response = await api.post(
    `/interviews/${interviewId}/complete`
  );

  return response.data;
};

export const getInterviewResult = async (interviewId) => {
  const response = await api.get(
    `/interviews/${interviewId}/result`
  );

  return response.data;
};

export const deleteInterview = async (interviewId) => {
  const response = await api.delete(
    `/interviews/${interviewId}`
  );

  return response.data;
};