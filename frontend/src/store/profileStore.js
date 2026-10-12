import { create } from "zustand";

import * as profileService from "../services/profile.service";

const useProfileStore = create((set) => ({
  user: null,

  isLoading: false,

  error: null,

  fetchProfile: async () => {
    try {

      set({
        isLoading: true,
        error: null,
      });

      const data =
        await profileService.getProfile();

      set({
        user: data.user,
        isLoading: false,
      });

    } catch (error) {

      set({
        error:
          error.response?.data?.message ||
          "Failed to load profile.",

        isLoading: false,
      });

    }
  },
}));

export default useProfileStore;