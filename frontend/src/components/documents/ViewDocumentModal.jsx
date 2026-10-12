import useDocumentStore from "../../store/documentStore";

const ViewDocumentModal = () => {
  const {
    isViewModalOpen,
    viewDocument,
    closeViewModal,
  } = useDocumentStore();

  if (!isViewModalOpen || !viewDocument) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">

        <h2 className="text-2xl font-bold">
          Document Details
        </h2>

        <div className="mt-6 space-y-5">

          <Info
            label="Title"
            value={viewDocument.title}
          />

          <Info
            label="Description"
            value={viewDocument.description}
          />

          <Info
            label="Case"
            value={viewDocument.caseId?.caseNumber}
          />

          <Info
            label="Created By"
            value={viewDocument.createdBy?.fullName}
          />

          <Info
            label="Date Added"
            value={new Date(
              viewDocument.dateAdded
            ).toLocaleDateString()}
          />

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

export default ViewDocumentModal;