import { useEffect } from "react";
import { useForm } from "react-hook-form";

import useUserStore from "../../store/userStore";

const UserModal = () => {
  const {
    isUserModalOpen,
    closeUserModal,
    selectedUser,

    createUser,
    updateUser,

    isLoading,
  } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      role: "Lawyer",
      password: "",
    },
  });

  useEffect(() => {
    if (!isUserModalOpen) {
      reset();
      return;
    }

    if (selectedUser) {
      reset({
        fullName: selectedUser.fullName,
        email: selectedUser.email,
        phoneNumber:
          selectedUser.phoneNumber || "",
        role: selectedUser.role,
        password: "",
      });
    } else {
      reset({
        fullName: "",
        email: "",
        phoneNumber: "",
        role: "Lawyer",
        password: "",
      });
    }
  }, [
    isUserModalOpen,
    selectedUser,
    reset,
  ]);

  const onSubmit = async (data) => {
    try {
      if (selectedUser) {
        if (!data.password) {
          delete data.password;
        }

        await updateUser(
          selectedUser._id,
          data
        );
      } else {
        await createUser(data);
      }

      reset();

      closeUserModal();

    } catch (error) {
      console.error(error);
    }
  };

  if (!isUserModalOpen) return null;

return (
  <dialog className="modal modal-open">

    <div className="modal-box max-w-2xl">

      <h3 className="text-2xl font-bold">

        {selectedUser
          ? "Edit User"
          : "Create User"}

      </h3>

      <p className="mt-2 text-base-content/70">

        {selectedUser
          ? "Update user information."
          : "Fill in the details below to create a new user."}

      </p>

      <form
        id="user-form"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
      >

        {/* Full Name */}

        <div className="md:col-span-2">

          <label className="label">
            <span className="label-text">
              Full Name
            </span>
          </label>

          <input
            type="text"
            className="input input-bordered w-full"
            {...register("fullName", {
              required: "Full name is required",
            })}
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-error">
              {errors.fullName.message}
            </p>
          )}

        </div>

        {/* Email */}

        <div>

          <label className="label">
            <span className="label-text">
              Email
            </span>
          </label>

          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-error">
              {errors.email.message}
            </p>
          )}

        </div>

        {/* Phone */}

        <div>

          <label className="label">
            <span className="label-text">
              Phone Number
            </span>
          </label>

          <input
            type="text"
            className="input input-bordered w-full"
            {...register("phoneNumber")}
          />

        </div>

        {/* Role */}

        <div>

          <label className="label">
            <span className="label-text">
              Role
            </span>
          </label>

          <select
            className="select select-bordered w-full"
            {...register("role", {
              required: "Role is required",
            })}
          >
            <option value="Admin">Admin</option>
            <option value="Clerk">Clerk</option>
            <option value="Judge">Judge</option>
            <option value="Lawyer">Lawyer</option>
          </select>

        </div>

        {/* Password */}

        <div>

          <label className="label">
            <span className="label-text">

              {selectedUser
                ? "New Password (optional)"
                : "Password"}

            </span>
          </label>

          <input
            type="password"
            className="input input-bordered w-full"
            {...register("password", {
              required: selectedUser
                ? false
                : "Password is required",
            })}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-error">
              {errors.password.message}
            </p>
          )}

        </div>

      </form>

      <div className="modal-action">

        <button
          className="btn btn-outline"
          onClick={() => {
            reset();
            closeUserModal();
          }}
        >
          Cancel
        </button>

        <button
          className="btn btn-primary"
          form="user-form"
          type="submit"
          disabled={isLoading}
        >

          {isLoading
            ? "Saving..."
            : selectedUser
              ? "Update User"
              : "Create User"}

        </button>

      </div>

    </div>

  </dialog>
  );
};

export default UserModal;