import { create } from "zustand";
import * as caseService from "../services/case.service";

const useCaseStore = create((set, get) => ({
  cases: [],
  pagination: null,

  isLoading: false,
  error: null,

  search: "",
  status: "",
  page: 1,
  limit: 10,
  isCaseModalOpen: false,
  isViewModalOpen: false,
  viewCase: null,
  selectedCase: null,
  deleteModalOpen: false,

  openViewModal: (courtCase) =>
  set({
    isViewModalOpen: true,
    viewCase: courtCase,
  }),

closeViewModal: () =>
  set({
    isViewModalOpen: false,
    viewCase: null,
  }),

  openDeleteModal: (courtCase) =>
  set({
    deleteModalOpen: true,
    selectedCase: courtCase,
  }),

closeDeleteModal: () =>
  set({
    deleteModalOpen: false,
    selectedCase: null,
  }),

createCase: async (caseData) => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    await caseService.createCase(caseData);

    await get().fetchCases();

    set({
      isLoading: false,
      isCaseModalOpen: false,
      selectedCase: null,
    });

  } catch (error) {
    set({
      error:
        error.response?.data?.message ||
        "Failed to create case.",
      isLoading: false,
    });

    throw error;
  }
},

updateCase: async (id, caseData) => {
  try {

    set({
      isLoading: true,
      error: null,
    });

    await caseService.updateCase(id, {
  caseTitle: caseData.caseTitle,
  caseType: caseData.caseType,
  plaintiff: caseData.plaintiff,
  defendant: caseData.defendant,
});

await caseService.assignJudge(
  id,
  caseData.assignedJudge
);

await caseService.assignLawyer(
  id,
  caseData.assignedLawyer
);

await caseService.updateCaseStatus(
  id,
  caseData.status
);

await get().fetchCases();

set({
  isLoading: false,
  isCaseModalOpen: false,
  selectedCase: null,
});

    await get().fetchCases();

    set({
      isLoading: false,
      isCaseModalOpen: false,
      selectedCase: null,
    });

  } catch (error) {

    set({
      error:
        error.response?.data?.message ||
        "Failed to update case.",
      isLoading: false,
    });

    throw error;

  }
},
deleteCase: async (id) => {
  try {

    set({
      isLoading: true,
      error: null,
    });

    await caseService.deleteCase(id);

    await get().fetchCases();
  set({
   isLoading: false,
   deleteModalOpen: false,
    selectedCase: null,
  });
    

  } catch (error) {

    set({
      error:
        error.response?.data?.message ||
        "Failed to delete case.",
      isLoading: false,
    });

    throw error;

  }
},
  openCaseModal: (courtCase = null) =>
  set({
    isCaseModalOpen: true,
    selectedCase: courtCase,
  }),

  closeCaseModal: () =>
  set({
    isCaseModalOpen: false,
    selectedCase: null,
  }),

  fetchCases: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const {
        search,
        status,
        page,
        limit,
      } = get();

      const data = await caseService.getCases({
        search,
        status,
        page,
        limit,
      });

      set({
        cases: data.cases,
        pagination: data.pagination,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to fetch cases.",
        isLoading: false,
      });
    }
  },

  setSearch: (search) => set({ search, page: 1 }),

  setStatus: (status) => set({ status, page: 1 }),

  setPage: (page) => set({ page }),

  resetFilters: () =>
    set({
      search: "",
      status: "",
      page: 1,
    }),
}));

export default useCaseStore;