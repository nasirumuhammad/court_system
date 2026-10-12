import { useEffect } from "react";
import useCaseStore from "../../store/caseStore";

import CasesHeader from "../../components/cases/CasesHeader";
import CasesFilters from "../../components/cases/CasesFilters";
import CasesTable from "../../components/cases/CasesTable";
import CaseModal from "../../components/cases/CaseModal";
import ViewCaseModal from "../../components/cases/ViewCaseModal";
import DeleteCaseModal from "../../components/cases/DeleteCaseModal";

const Cases = () => {
  const {
    fetchCases,
    search,
    status,
    page,
    limit,
  } = useCaseStore();

  useEffect(() => {
    fetchCases();
  }, [search, status, page, limit]);

  return (
    <div className="space-y-6">
      <CasesHeader />
      <CasesFilters />
      <CasesTable />
      <CaseModal />
      <ViewCaseModal />
      <DeleteCaseModal />
    </div>
  );
};

export default Cases;