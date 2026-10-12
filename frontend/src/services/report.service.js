import api from "../api/axios";

export const getDashboardSummary = async () => {
  const response = await api.get("/reports/summary");
  return response.data;
};

export const getDashboardReport = async () => {
  const response = await api.get("/reports/report");

  return response.data;
};