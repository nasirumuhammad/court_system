import { useEffect } from "react";
import useHearingStore from "../../store/hearingStore";

import HearingsHeader from "../../components/hearings/HearingsHeader";
import HearingsFilters from "../../components/hearings/HearingsFilters";
import HearingsTable from "../../components/hearings/HearingsTable";
import HearingModal from "../../components/hearings/HearingModal";
import ViewHearingModal from "../../components/hearings/ViewHearingModal";
import DeleteHearingModal from "../../components/hearings/DeleteHearingModal";

const Hearings = () => {
  const {
    fetchHearings,
    search,
    page,
    limit,
  } = useHearingStore();

  useEffect(() => {
    fetchHearings();
  }, [search, page, limit]);

  return (
    <div className="space-y-6">

      <HearingsHeader />

      <HearingsFilters />

      <HearingsTable />

      <HearingModal />

      <ViewHearingModal />

      <DeleteHearingModal />

    </div>
  );
};

export default Hearings;