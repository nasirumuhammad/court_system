import { create } from "zustand";
import * as userService from "../services/user.service";

const useUserStore = create((set, get) => ({
  judges: [],
  lawyers: [],
  pagination: null,
  
  users: [],
  search: "",
  role: "",
  page: 1,
  limit: 10,

  isUserModalOpen: false,
  isViewModalOpen: false,
  deleteModalOpen: false,

  selectedUser: null,
  viewUser: null,
  isLoading: false,
  error: null,

  openUserModal: (user = null) =>
    set({
      isUserModalOpen: true,
      selectedUser: user,
    }),

  closeUserModal: () =>
    set({
      isUserModalOpen: false,
      selectedUser: null,
    }),

  openViewModal: (user) =>
    set({
      isViewModalOpen: true,
      viewUser: user,
    }),

  closeViewModal: () =>
    set({
      isViewModalOpen: false,
      viewUser: null,
    }),

  openDeleteModal: (user) =>
    set({
      deleteModalOpen: true,
      selectedUser: user,
    }),

  closeDeleteModal: () =>
    set({
      deleteModalOpen: false,
      selectedUser: null,
    }),

  fetchJudges: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await userService.getUsersByRole("Judge");

      set({
        judges: data.users,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to load judges.",
        isLoading: false,
      });
    }
  },

  fetchLawyers: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await userService.getUsersByRole("Lawyer");

      set({
        lawyers: data.users,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to load lawyers.",
        isLoading: false,
      });
    }
  },
  fetchUsers: async () => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    const {
      search,
      role,
      page,
      limit,
    } = get();

    const data = await userService.getUsers({
      search,
      role,
      page,
      limit,
    });

    set({
      users: data.users,
      pagination: data.pagination,
      isLoading: false,
    });

  } catch (error) {
    set({
      error:
        error.response?.data?.message ||
        "Failed to fetch users.",
      isLoading: false,
    });
  }
},

createUser: async (userData) => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    await userService.createUser(userData);

    await get().fetchUsers();

    set({
      isLoading: false,
      isUserModalOpen: false,
      selectedUser: null,
    });

  } catch (error) {
    set({
      error:
        error.response?.data?.message ||
        "Failed to create user.",
      isLoading: false,
    });

    throw error;
  }
},

updateUser: async (id, userData) => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    await userService.updateUser(id, userData);

    await get().fetchUsers();

    set({
      isLoading: false,
      isUserModalOpen: false,
      selectedUser: null,
    });

  } catch (error) {
    set({
      error:
        error.response?.data?.message ||
        "Failed to update user.",
      isLoading: false,
    });

    throw error;
  }
},

deleteUser: async (id) => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    await userService.deleteUser(id);

    await get().fetchUsers();

    set({
      isLoading: false,
      deleteModalOpen: false,
      selectedUser: null,
    });

  } catch (error) {
    set({
      error:
        error.response?.data?.message ||
        "Failed to delete user.",
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

setRole: (role) =>
  set({
    role,
    page: 1,
  }),

setPage: (page) =>
  set({
    page,
  }),

resetFilters: () =>
  set({
    search: "",
    role: "",
    page: 1,
  }),

}));

export default useUserStore;