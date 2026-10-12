import { create } from "zustand";
import * as reportService from "../services/report.service";

const useReportStore = create((set) => ({
  summary: null,
  report: null,

  isLoading: false,
  error: null,

  fetchSummary: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await reportService.getDashboardSummary();
      set({
        summary: data.summary,
        isLoading: false,
      });

    } catch (error) {
  console.log(error);
      set({
        error:
          error.response?.data?.message ||
          "Failed to load dashboard summary.",
        isLoading: false,
      });

    }
  },

  fetchReport: async () => {
    try {

      set({
        isLoading: true,
        error: null,
      });

      const data =
        await reportService.getDashboardReport();

      set({
        report: data.report,
        isLoading: false,
      });

    } catch (error) {

      set({
        error:
          error.response?.data?.message ||
          "Failed to load reports.",
        isLoading: false,
      });

    }
  },
}));

export default useReportStore;