import { useEffect } from "react";

import useReportStore from "../../store/reportStore";

import ReportCards from "../../components/reports/ReportCards";
import StatusDonutChart from "../../components/reports/StatusDonutChart";
import CasesPerJudgeBarChart from "../../components/reports/CasesPerJudgeBarChart";
import JudgeReportTable from "../../components/reports/JudgeReportTable";

const Reports = () => {
  const {
    report,
    fetchReport,
    isLoading,
    error,
  } = useReportStore();

  useEffect(() => {
    fetchReport();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="mt-2 text-base-content/60">
          Court analytics and statistics.
        </p>

      </div>

      {/* Summary Cards */}

      <ReportCards report={report} />

      {/* Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <StatusDonutChart report={report} />

        <CasesPerJudgeBarChart report={report} />

      </div>

      {/* Judge Table */}

      <JudgeReportTable report={report} />

    </div>
  );
};

export default Reports;