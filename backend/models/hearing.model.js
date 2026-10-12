import mongoose from "mongoose";

const hearingSchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: [true, "Case is required"],
    },

    hearingDate: {
      type: Date,
      required: [true, "Hearing date is required"],
    },

    hearingTime: {
      type: String,
      required: [true, "Hearing time is required"],
      trim: true,
    },

    courtRoom: {
      type: String,
      required: [true, "Court room is required"],
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hearing = mongoose.model("Hearing", hearingSchema);

export default Hearing;