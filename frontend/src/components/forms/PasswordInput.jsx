import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const PasswordInput = ({
  label,
  name,
  placeholder,
  register,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">
          {label}
        </span>
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`input input-bordered w-full pr-12 ${
            error ? "input-error" : ""
          }`}
          {...register(name)}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="btn btn-ghost btn-sm absolute right-2 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">
            {error.message}
          </span>
        </label>
      )}
    </div>
  );
};

export default PasswordInput;