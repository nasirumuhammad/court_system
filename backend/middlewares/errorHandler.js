const errorHandler = (err, req, res, _next) => {
  let statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  let message = err.message || "Something went wrong";

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "value";
    statusCode = 409;
    message = `${field} already exists`;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((error) => error.message).join(", ");
  } else if (err.message === "Origin is not allowed by CORS") {
    statusCode = 403;
    message = "Origin is not allowed";
  }

  if (statusCode >= 500) {
    console.error("Unhandled request error:", err);
    if (process.env.NODE_ENV === "production") message = "Internal server error";
  }

  return res.status(statusCode).json({ success: false, message });
};

export default errorHandler;
