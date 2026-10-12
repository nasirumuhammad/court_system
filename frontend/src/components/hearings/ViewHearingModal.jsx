import useHearingStore from "../../store/hearingStore";

const ViewHearingModal = () => {
  const {
    isViewModalOpen,
    closeViewModal,
    viewHearing,
  } = useHearingStore();

  if (!isViewModalOpen || !viewHearing)
    return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">

        <h3 className="text-2xl font-bold">
          Hearing Details
        </h3>

        <div className="mt-6 space-y-4">

          {/* Case */}
          <div>
            <p className="text-sm text-base-content/60">
              Case
            </p>
            <p className="font-semibold">
              {viewHearing.caseId?.caseTitle}
            </p>
            <p className="text-xs text-base-content/50">
              {viewHearing.caseId?.caseNumber}
            </p>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-base-content/60">
                Date
              </p>
              <p className="font-semibold">
                {new Date(
                  viewHearing.hearingDate
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/60">
                Time
              </p>
              <p className="font-semibold">
                {viewHearing.hearingTime}
              </p>
            </div>

          </div>

          {/* Court Room */}
          <div>
            <p className="text-sm text-base-content/60">
              Court Room
            </p>
            <p className="font-semibold">
              {viewHearing.courtRoom}
            </p>
          </div>

          {/* Notes */}
          <div>
            <p className="text-sm text-base-content/60">
              Notes
            </p>
            <p className="font-semibold">
              {viewHearing.notes || "No notes"}
            </p>
          </div>

        </div>

        <div className="modal-action">
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

export default ViewHearingModal;