import { useEffect } from "react";

import useCaseStore from "../../store/caseStore";
import useHearingStore from "../../store/hearingStore";

import StatusBadge from "../ui/StatusBadge";

const ViewCaseModal = () => {
  const {
    isViewModalOpen,
    viewCase,
    closeViewModal,
  } = useCaseStore();

  const {
    caseHearings,
    fetchHearingsByCase,
  } = useHearingStore();

  useEffect(() => {
    if (isViewModalOpen && viewCase?._id) {
      fetchHearingsByCase(viewCase._id);
    }
  }, [
    isViewModalOpen,
    viewCase?._id,
    fetchHearingsByCase,
  ]);

  if (!isViewModalOpen || !viewCase) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold">
          Case Details
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Info
            label="Case Number"
            value={viewCase.caseNumber}
          />

          <Info
            label="Status"
            value={
              <StatusBadge status={viewCase.status} />
            }
          />

          <Info
            label="Case Title"
            value={viewCase.caseTitle}
          />

          <Info
            label="Case Type"
            value={viewCase.caseType}
          />

          <Info
            label="Plaintiff"
            value={viewCase.plaintiff}
          />

          <Info
            label="Defendant"
            value={viewCase.defendant}
          />

          <Info
            label="Judge"
            value={
              viewCase.assignedJudge?.fullName ||
              "Not Assigned"
            }
          />

          <Info
            label="Lawyer"
            value={
              viewCase.assignedLawyer?.fullName ||
              "Not Assigned"
            }
          />

          <Info
            label="Filed On"
            value={new Date(
              viewCase.filingDate
            ).toLocaleDateString()}
          />

          <Info
            label="Created By"
            value={viewCase.createdBy?.fullName}
          />
        </div>

        <div className="divider my-8"></div>

        <div >
          <h3 className="text-xl font-bold">
            Hearings
          </h3>

          
        </div>

        <div className="mt-5 space-y-4">
          {caseHearings.length === 0 ? (
            <div className="alert">
              <span>
                No hearings scheduled for this case.
              </span>
            </div>
          ) : (
            caseHearings.map((hearing) => (
              <div
                key={hearing._id}
                className="card border border-base-300 bg-base-100"
              >
                <div className="card-body">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold">
                        {new Date(
                          hearing.hearingDate
                        ).toLocaleDateString()}
                      </p>

                      <p className="text-sm text-base-content/60">
                        {hearing.hearingTime} •{" "}
                        {hearing.courtRoom}
                      </p>
                    </div>

                    <div className="text-sm text-base-content/60">
                      Created by:{" "}
                      {hearing.createdBy?.fullName}
                    </div>
                  </div>

                  {hearing.notes && (
                    <>
                      <div className="divider my-2"></div>

                      <p>{hearing.notes}</p>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="modal-action mt-8">
          <button
            className="btn"
            onClick={closeViewModal}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-base-content/60">
      {label}
    </p>

    <div className="mt-1 font-semibold">
      {value}
    </div>
  </div>
);

export default ViewCaseModal;