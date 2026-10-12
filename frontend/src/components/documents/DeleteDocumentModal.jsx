import useDocumentStore from "../../store/documentStore";

const DeleteDocumentModal = () => {
  const {
    deleteModalOpen,
    selectedDocument,
    closeDeleteModal,
    deleteDocument,
    isLoading,
  } = useDocumentStore();

  if (!deleteModalOpen || !selectedDocument) return null;

  const handleDelete = async () => {
    try {
      await deleteDocument(selectedDocument._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">

        <h3 className="text-xl font-bold text-error">
          Delete Document
        </h3>

        <p className="mt-4">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {selectedDocument.title}
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
            disabled={isLoading}
          >
            {isLoading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>
    </dialog>
  );
};

export default DeleteDocumentModal;