import { FaPlus } from "react-icons/fa";

import useUserStore from "../../store/userStore";

const UsersHeader = () => {
  const {
    search,
    role,

    setSearch,
    setRole,
    resetFilters,

    openUserModal,
  } = useUserStore();

  return (
    <>
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <p className="text-base-content/60">
            Manage system users.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => openUserModal()}
        >
          <FaPlus />
          Add User
        </button>

      </div>

      <div className="card bg-base-100 shadow">

        <div className="card-body">

          <div className="flex flex-col gap-4 md:flex-row">

            <input
              type="text"
              placeholder="Search users..."
              className="input input-bordered flex-1"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              className="select select-bordered"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option value="">
                All Roles
              </option>

              <option value="Admin">
                Admin
              </option>

              <option value="Clerk">
                Clerk
              </option>

              <option value="Judge">
                Judge
              </option>

              <option value="Lawyer">
                Lawyer
              </option>
            </select>

            <button
              className="btn btn-outline"
              onClick={resetFilters}
            >
              Reset
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default UsersHeader;