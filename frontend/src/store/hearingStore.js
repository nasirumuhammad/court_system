import { create } from "zustand";
import * as hearingService from "../services/hearing.service";

const useHearingStore = create((set, get) => ({


  hearings: [],
  pagination: null,
  selectedCaseId: null,
  isLoading: false,
  caseHearings: [],
  error: null,

  search: "",
  page: 1,
  limit: 10,

  isHearingModalOpen: false,
  isViewModalOpen: false,
  deleteModalOpen: false,

  selectedHearing: null,
  viewHearing: null,

  openHearingModal: (caseId = null) =>
  set({
    isHearingModalOpen: true,
    selectedCaseId: caseId,
  }),

  closeHearingModal: () =>
  set({
    isHearingModalOpen: false,
    selectedHearing: null,
    selectedCaseId: null,
  }),

  openViewModal: (hearing) =>
    set({
      isViewModalOpen: true,
      viewHearing: hearing,
    }),

  closeViewModal: () =>
    set({
      isViewModalOpen: false,
      viewHearing: null,
    }),

  openDeleteModal: (hearing) =>
    set({
      deleteModalOpen: true,
      selectedHearing: hearing,
    }),

  closeDeleteModal: () =>
    set({
      deleteModalOpen: false,
      selectedHearing: null,
    }),

  fetchHearings: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const {
        search,
        page,
        limit,
      } = get();

      const data =
        await hearingService.fetchHearings({
          search,
          page,
          limit,
        });

      set({
        hearings: data.hearings,
        pagination:data.pagination,
        isLoading: false,
      });

    } catch (error) {

      set({
        error:
          error.response?.data?.message ||
          "Failed to fetch hearings.",
        isLoading: false,
      });

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
    createHearing: async (hearingData) => {
  try {
    set({ isLoading: true, error: null });

    await hearingService.createHearing(hearingData);

    await get().fetchHearings();

    set({
      isLoading: false,
      isHearingModalOpen: false,
      selectedHearing: null,
    });

  } catch (error) {
    set({
      error:
        error.response?.data?.message ||
        "Failed to create hearing",
      isLoading: false,
    });

    throw error;
  }
},
updateHearing: async (id, hearingData) => {
  try {
    set({ isLoading: true, error: null });

    await hearingService.updateHearing(
      id,
      hearingData
    );

    await get().fetchHearings();

    set({
      isLoading: false,
      isHearingModalOpen: false,
      selectedHearing: null,
    });

  } catch (error) {
    set({
      error:
        error.response?.data?.message ||
        "Failed to update hearing",
      isLoading: false,
    });

    throw error;
  }
},
deleteHearing: async (id) => {
  try {
    set({ isLoading: true, error: null });

    await hearingService.deleteHearing(id);

    await get().fetchHearings();

    set({
      isLoading: false,
      deleteModalOpen: false,
      selectedHearing: null,
    });

  } catch (error) {
    set({
      error:
        error.response?.data?.message ||
        "Failed to delete hearing",
      isLoading: false,
    });

    throw error;
  }
},

fetchHearingsByCase: async (caseId) => {
  try {
    set({ isLoading: true, error: null, caseHearings: [] });

    const data = await hearingService.getHearingsByCase(caseId);

    set({
      caseHearings: data.hearings || [],
      isLoading: false,
    });

  } catch (error) {
    set({
      error:
        error.response?.data?.message ||
        "Failed to fetch case hearings",
      isLoading: false,
    });
  }
},
}));

export default useHearingStore;