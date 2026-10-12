import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      unique: true,
    },

    caseTitle: {
      type: String,
      required: [true, "Case title is required"],
      trim: true,
    },

    caseType: {
      type: String,
      required: [true, "Case type is required"],
      enum: ["Civil", "Criminal", "Family", "Corporate", "Other"],
    },

    plaintiff: {
      type: String,
      required: [true, "Plaintiff is required"],
      trim: true,
    },

    defendant: {
      type: String,
      required: [true, "Defendant is required"],
      trim: true,
    },

    assignedJudge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedLawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filingDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Pending", "Ongoing", "Adjourned", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Generate case number before saving
caseSchema.pre("save", function () {
  // Don't regenerate if it already exists
  if (this.caseNumber) return;

  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);

  this.caseNumber = `CASE-${year}-${random}`;
});

const Case = mongoose.model("Case", caseSchema);

export default Case;