import {
  FaScaleBalanced,
  FaUsers,
  FaFileLines,
  FaGavel,
} from "react-icons/fa6";
import { useEffect } from "react";
import useReportStore from "../../store/reportStore";

import DashboardHero from "../../components/dashboard/DashboardHero";
import StatCard from "../../components/dashboard/StatCard";

const DashboardHome = () => {

    const { summary, fetchSummary, isLoading, } = useReportStore();

    useEffect(() => {
         fetchSummary();
     }, [fetchSummary]);


  const stats = [
  {
    title: "Total Cases",
    value: summary?.totalCases ?? 0,
    icon: FaScaleBalanced,
  },
  {
    title: "Total Users",
    value: summary?.totalUsers ?? 0,
    icon: FaUsers,
  },
  {
    title: "Total Hearings",
    value: summary?.totalHearings ?? 0,
    icon: FaGavel,
  },
  {
    title: "Total Documents",
    value: summary?.totalDocuments ?? 0,
    icon: FaFileLines,
  },
];
    
    if (isLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      );
    }
    
  return (
    <div className="space-y-8">

        

      <DashboardHero />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>

    </div>
  );
};

export default DashboardHome;