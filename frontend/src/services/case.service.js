import api from "../api/axios";

export const getCases = async ({
  search = "",
  status = "",
  page = 1,
  limit = 10,
}) => {
  const response = await api.get("/cases", {
    params: {
      search,
      status,
      page,
      limit,
    },
  });

  return response.data;
};


export const createCase = async (caseData) => {
  const response = await api.post("/cases", caseData);

  return response.data;
};

export const updateCase = async (id, caseData) => {

  console.log(caseData)
  const response = await api.put(`/cases/${id}`, caseData);

  return response.data;
};

export const deleteCase = async (id) => {
  const response = await api.delete(`/cases/${id}`);

  return response.data;
};

export const assignJudge = async (id, judgeId) => {
  const response = await api.put(`/cases/${id}/assign-judge`, {
    judgeId,
  });

  return response.data;
};

export const assignLawyer = async (id, lawyerId) => {
  const response = await api.put(`/cases/${id}/assign-lawyer`, {
    lawyerId,
  });

  return response.data;
};

export const updateCaseStatus = async (id, status) => {
  const response = await api.put(`/cases/${id}/status`, {
    status,
  });

  return response.data;
};