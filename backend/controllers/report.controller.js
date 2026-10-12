import mongoose from "mongoose";
import Case from "../models/case.model.js";
import Hearing from "../models/hearing.model.js";
import Document from "../models/document.model.js";
import User from "../models/user.model.js";


export const getDashboardReport = async (req, res) => {
  const totalCases = await Case.countDocuments();

  const pendingCases = await Case.countDocuments({
    status: "Pending",
  });

  const ongoingCases = await Case.countDocuments({
    status: "Ongoing",
  });

  const adjournedCases = await Case.countDocuments({
    status: "Adjourned",
  });

  const completedCases = await Case.countDocuments({
    status: "Completed",
  });

  const casesPerJudge = await Case.aggregate([
    {
      $match: {
        assignedJudge: {
          $ne: null,
        },
      },
    },
    {
      $group: {
        _id: "$assignedJudge",
        totalCases: {
          $sum: 1,
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "judge",
      },
    },
    {
      $unwind: "$judge",
    },
    {
      $project: {
        _id: 0,
        judgeId: "$judge._id",
        judgeName: "$judge.fullName",
        totalCases: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    report: {
      totalCases,
      pendingCases,
      ongoingCases,
      adjournedCases,
      completedCases,
      casesPerJudge,
    },
  });
};


export const getDashboardSummary = async (req, res) => {
  const [
    totalCases,
    totalUsers,
    totalHearings,
    totalDocuments,
    recentCases,
    recentHearings,
  ] = await Promise.all([
    Case.countDocuments(),
    User.countDocuments(),
    Hearing.countDocuments(),
    Document.countDocuments(),

    Case.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("assignedJudge assignedLawyer"),

    Hearing.find()
      .sort({ hearingDate: 1 })
      .limit(5)
      .populate("caseId"),
  ]);

  res.status(200).json({
    success: true,

    summary: {
      totalCases,
      totalUsers,
      totalHearings,
      totalDocuments,
    }
  });
};