import useUserStore from "../../store/userStore";

const DeleteUserModal = () => {
  const {
    deleteModalOpen,
    closeDeleteModal,
    selectedUser,
    deleteUser,
    isLoading,
  } = useUserStore();

  if (!deleteModalOpen || !selectedUser) return null;

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog className="modal modal-open">

      <div className="modal-box">

        <h3 className="text-xl font-bold text-error">
          Delete User
        </h3>

        <p className="mt-4">
          Are you sure you want to delete
          <span className="font-bold">
            {" "}
            {selectedUser.fullName}
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-base-content/60">
          This action cannot be undone.
        </p>

        <div className="modal-action">

          <button
            className="btn btn-outline"
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

export default DeleteUserModal;