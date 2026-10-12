import useUserStore from "../../store/userStore";

const ViewUserModal = () => {
  const {
    isViewModalOpen,
    viewUser,
    closeViewModal,
  } = useUserStore();

  if (!isViewModalOpen || !viewUser) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">

        <h2 className="text-2xl font-bold">
          User Details
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

          <Info
            label="Full Name"
            value={viewUser.fullName}
          />

          <Info
            label="Email"
            value={viewUser.email}
          />

          <Info
            label="Phone Number"
            value={viewUser.phoneNumber || "N/A"}
          />

          <Info
            label="Role"
            value={viewUser.role}
          />

          <Info
            label="Created At"
            value={new Date(
              viewUser.createdAt
            ).toLocaleDateString()}
          />

          <Info
            label="Updated At"
            value={new Date(
              viewUser.updatedAt
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

export default ViewUserModal;