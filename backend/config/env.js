const required = ["MONGO_URI", "JWT_SECRET", "REFRESH_SECRET"];

export function validateEnv() {
  const missing = required.filter((key) => !process.env[key]?.trim());
  if (missing.length) {
    throw new Error(`Missing required environment variable(s): ${missing.join(", ")}`);
  }

  if (process.env.JWT_SECRET.length < 32 || process.env.REFRESH_SECRET.length < 32) {
    throw new Error("JWT_SECRET and REFRESH_SECRET must each be at least 32 characters long.");
  }

  if (process.env.JWT_SECRET === process.env.REFRESH_SECRET) {
    throw new Error("JWT_SECRET and REFRESH_SECRET must be different values.");
  }
}
