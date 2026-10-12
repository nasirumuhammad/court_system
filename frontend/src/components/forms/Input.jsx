const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">
          {label}
        </span>
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full ${
          error ? "input-error" : ""
        }`}
        {...register(name)}
      />

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

export default Input;