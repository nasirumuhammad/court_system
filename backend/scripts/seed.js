import "dotenv/config";
import mongoose from "mongoose";
import { validateEnv } from "../config/env.js";
import User from "../models/user.model.js";

const adminOnly = process.argv.includes("--admin-only");

async function seedAdmin() {
  const fullName = process.env.SEED_ADMIN_NAME?.trim();
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!fullName || !email || !password) {
    throw new Error("Set SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD to seed an administrator.");
  }
  if (password.length < 12) {
    throw new Error("SEED_ADMIN_PASSWORD must be at least 12 characters long.");
  }

  const existing = await User.findOne({ email }).select("+password");
  if (existing) {
    if (existing.role !== "Admin") {
      throw new Error(`The configured seed email (${email}) already belongs to a non-admin user; refusing to change roles.`);
    }
    console.info(`Seed administrator already exists: ${email}. No changes made.`);
    return;
  }

  // User model middleware hashes this password before it is persisted.
  await User.create({ fullName, email, password, role: "Admin" });
  console.info(`Seed administrator created: ${email}`);
}

async function main() {
  try {
    validateEnv();
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    await seedAdmin();
    if (!adminOnly) {
      console.info("No demo case data is seeded. Add domain-specific fixtures only when they are safe for your environment.");
    }
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

main();
