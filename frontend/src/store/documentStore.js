import { create } from "zustand";
import * as documentService from "../services/document.service";

const useDocumentStore = create((set, get) => ({
  documents: [],
  caseDocuments: [],
  pagination: null,

  isLoading: false,
  error: null,

  search: "",
  page: 1,
  limit: 10,

  isDocumentModalOpen: false,
  isViewModalOpen: false,
  deleteModalOpen: false,

  selectedDocument: null,
  viewDocument: null,
  selectedCaseId: null,

  openDocumentModal: (caseId = null, document = null) =>
    set({
      isDocumentModalOpen: true,
      selectedCaseId: caseId,
      selectedDocument: document,
    }),

  closeDocumentModal: () =>
    set({
      isDocumentModalOpen: false,
      selectedDocument: null,
      selectedCaseId: null,
    }),

  openViewModal: (document) =>
    set({
      isViewModalOpen: true,
      viewDocument: document,
    }),

  closeViewModal: () =>
    set({
      isViewModalOpen: false,
      viewDocument: null,
    }),

  openDeleteModal: (document) =>
    set({
      deleteModalOpen: true,
      selectedDocument: document,
    }),

  closeDeleteModal: () =>
    set({
      deleteModalOpen: false,
      selectedDocument: null,
    }),

  fetchDocuments: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const { search, page, limit } = get();

      const data = await documentService.fetchDocuments({
        search,
        page,
        limit,
      });

      set({
        documents: data.documents,
        pagination: data.pagination,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to fetch documents.",
        isLoading: false,
      });
    }
  },

  fetchDocumentsByCase: async (caseId) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data =
        await documentService.getDocumentsByCase(caseId);

      set({
        caseDocuments: data.documents,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to fetch case documents.",
        isLoading: false,
      });
    }
  },

  createDocument: async (documentData) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await documentService.createDocument(documentData);

      await get().fetchDocuments();

      set({
        isLoading: false,
        isDocumentModalOpen: false,
        selectedDocument: null,
        selectedCaseId: null,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to create document.",
        isLoading: false,
      });

      throw error;
    }
  },

  updateDocument: async (id, documentData) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await documentService.updateDocument(
        id,
        documentData
      );

      await get().fetchDocuments();

      set({
        isLoading: false,
        isDocumentModalOpen: false,
        selectedDocument: null,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to update document.",
        isLoading: false,
      });

      throw error;
    }
  },

  deleteDocument: async (id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await documentService.deleteDocument(id);

      await get().fetchDocuments();

      set({
        isLoading: false,
        deleteModalOpen: false,
        selectedDocument: null,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to delete document.",
        isLoading: false,
      });

      throw error;
    }
  },

  setSearch: (search) =>
    set({
      search,
      page: 1,
    }),

  setPage: (page) =>
    set({
      page,
    }),

  resetFilters: () =>
    set({
      search: "",
      page: 1,
    }),
}));

export default useDocumentStore;