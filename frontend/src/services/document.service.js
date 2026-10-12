import api from "../api/axios";

export const fetchDocuments = async (params) => {
  const response = await api.get("/documents", {
    params,
  });

  return response.data;
};

export const getDocumentsByCase = async (caseId) => {
  const response = await api.get(
    `/documents/case/${caseId}`
  );

  return response.data;
};

export const createDocument = async (documentData) => {
  const response = await api.post(
    "/documents",
    documentData
  );

  return response.data;
};

export const updateDocument = async (
  id,
  documentData
) => {
  const response = await api.put(
    `/documents/${id}`,
    documentData
  );

  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(
    `/documents/${id}`
  );

  return response.data;
};

export const getDocumentById = async (id) => {
  const response = await api.get(
    `/documents/${id}`
  );

  return response.data;
};