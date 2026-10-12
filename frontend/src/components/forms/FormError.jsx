const FormError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="alert alert-error">
      <span>{message}</span>
    </div>
  );
};

export default FormError;