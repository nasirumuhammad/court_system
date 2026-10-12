import useHearingStore from "../../store/hearingStore";
import StatusBadge from "../../components/ui/StatusBadge";

const HearingsTable = () => {
  const {
    hearings,
    isLoading,
    openViewModal,
    openDeleteModal,
  } = useHearingStore();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!hearings.length) {
    return (
      <div className="text-center py-10 text-base-content/60">
        No hearings found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">

        <thead>
          <tr>
            <th>Case</th>
            <th>Status</th>
            <th>Date</th>
            <th>Time</th>
            <th>Court Room</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {hearings.map((hearing) => (
            <tr key={hearing._id}>

              {/* Case Info */}
              <td>
                <div>
                  <p className="font-semibold">
                    {hearing.caseId?.caseTitle}
                  </p>
                  <p className="text-xs text-base-content/60">
                    {hearing.caseId?.caseNumber}
                  </p>
                </div>
              </td>

              {/* Case Status */}
              <td>
                <StatusBadge
                  status={hearing.caseId?.status}
                />
              </td>

              {/* Hearing Date */}
              <td>
                {new Date(
                  hearing.hearingDate
                ).toLocaleDateString()}
              </td>

              {/* Time */}
              <td>{hearing.hearingTime}</td>

              {/* Court Room */}
              <td>{hearing.courtRoom}</td>

              {/* Actions */}
              <td className="space-x-2">

                <button
                  className="btn btn-sm btn-info"
                  onClick={() =>
                    openViewModal(hearing)
                  }
                >
                  View
                </button>

                <button
                  className="btn btn-sm btn-error"
                  onClick={() =>
                    openDeleteModal(hearing)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default HearingsTable;