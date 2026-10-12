import api from "../api/axios";

export const fetchHearings = async (params) => {
  const response = await api.get("/hearings", {
    params,
  });

  return response.data;
};

export const getHearingsByCase = async (caseId) => {
  const response = await api.get(
    `/hearings/case/${caseId}`
  );

  return response.data;
};

export const createHearing = async (hearingData) => {
  const response = await api.post(
    "/hearings",
    hearingData
  );

  return response.data;
};

export const updateHearing = async (
  id,
  hearingData
) => {
  const response = await api.put(
    `/hearings/${id}`,
    hearingData
  );

  return response.data;
};

export const deleteHearing = async (id) => {
  const response = await api.delete(
    `/hearings/${id}`
  );

  return response.data;
};