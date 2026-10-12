import { FaEye, FaPen, FaTrash } from "react-icons/fa";

import useUserStore from "../../store/userStore";

const UsersTable = () => {
  const {
    users,
    pagination,
    isLoading,

    page,
    setPage,

    openViewModal,
    openUserModal,
    openDeleteModal,
  } = useUserStore();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow">

      <div className="overflow-x-auto">

        <table className="table">

          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>

                  <td>{user.fullName}</td>

                  <td>{user.email}</td>

                  <td>
                    <div className="badge badge-outline">
                      {user.role}
                    </div>
                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() =>
                          openViewModal(user)
                        }
                      >
                        <FaEye />
                      </button>

                      <button
                        className="btn btn-sm btn-ghost text-info"
                        onClick={() =>
                          openUserModal(user)
                        }
                      >
                        <FaPen />
                      </button>

                      <button
                        className="btn btn-sm btn-ghost text-error"
                        onClick={() =>
                          openDeleteModal(user)
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-end p-4">

          <div className="join">

            <button
              className="join-item btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            <button className="join-item btn btn-active">
              {page}
            </button>

            <button
              className="join-item btn"
              disabled={
                page === pagination.totalPages
              }
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default UsersTable;