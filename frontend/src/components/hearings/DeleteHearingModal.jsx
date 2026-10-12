import useHearingStore from "../../store/hearingStore";

const DeleteHearingModal = () => {
  const {
    deleteModalOpen,
    closeDeleteModal,
    selectedHearing,
    deleteHearing,
  } = useHearingStore();

  if (!deleteModalOpen || !selectedHearing)
    return null;

  const handleDelete = async () => {
    try {
      await deleteHearing(selectedHearing._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">

        <h3 className="text-xl font-bold text-error">
          Delete Hearing
        </h3>

        <p className="py-4">
          Are you sure you want to delete this hearing for:
        </p>

        <p className="font-semibold">
          {selectedHearing.caseId?.caseTitle}
        </p>

        <div className="modal-action">

          <button
            className="btn"
            onClick={closeDeleteModal}
          >
            Cancel
          </button>

          <button
            className="btn btn-error"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </div>
    </dialog>
  );
};

export default DeleteHearingModal;