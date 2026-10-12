import useCaseStore from "../../store/caseStore";

const DeleteCaseModal = () => {

  const {
    deleteCase,
    deleteModalOpen,
    selectedCase,
    closeDeleteModal,
  } = useCaseStore();

  if (!deleteModalOpen || !selectedCase)
    return null;

  const handleDelete = async () => {

    await deleteCase(selectedCase._id);


  };

  return (

    <dialog className="modal modal-open">

      <div className="modal-box">

        <h3 className="text-2xl font-bold text-error">
          Delete Case
        </h3>

        <p className="mt-4">

          Are you sure you want to delete

          <span className="font-bold">

            {" "}
            {selectedCase.caseTitle}

          </span>

          ?

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

export default DeleteCaseModal;