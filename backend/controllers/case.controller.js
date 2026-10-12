import Case from "../models/case.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";


export const createCase = async (req, res) => {

  const { caseTitle, caseType, plaintiff, defendant } = req.body;

  if (!caseTitle || !caseType || !plaintiff || !defendant) {
    throw new AppError("All required fields are required", 400);
  }

  const newCase = await Case.create({
    caseTitle,
    caseType,
    plaintiff,
    defendant,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Case created successfully",
    case: newCase,
  });
};


export const getAllCases = async (req, res) => {
  const {
    search,
    status,
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};

  
  if (req.user.role === "Judge") {
    filter.assignedJudge = req.user._id;
  }

  if (req.user.role === "Lawyer") {
    filter.assignedLawyer = req.user._id;
  }


  if (search) {
    filter.$or = [
      {
        caseNumber: {
          $regex: search,
          $options: "i",
        },
      },
      {
        caseTitle: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

 
  if (status) {
    filter.status = status;
  }

  
  const pageNumber = Math.max(Number(page) || 1, 1);
  const pageSize = Math.max(Number(limit) || 10, 1);

  const skip = (pageNumber - 1) * pageSize;

  const totalCases = await Case.countDocuments(filter);

  const cases = await Case.find(filter)
    .populate("assignedJudge", "fullName email role")
    .populate("assignedLawyer", "fullName email role")
    .populate("createdBy", "fullName email role")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  res.status(200).json({
    success: true,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalCases / pageSize),
    totalCases,
    count: cases.length,
    cases,
  });
};


export const getCaseById = async (req, res) => {
  const singleCase = await Case.findById(req.params.id)
    .populate("assignedJudge", "fullName email role")
    .populate("assignedLawyer", "fullName email role")
    .populate("createdBy", "fullName email role");

  if (!singleCase) {
    throw new AppError("Case not found", 404);
  }


  if (
    req.user.role === "Judge" &&
    singleCase.assignedJudge?._id.toString() !== req.user._id.toString()
  ) {
    throw new AppError("Access denied", 403);
  }

  if (
    req.user.role === "Lawyer" &&
    singleCase.assignedLawyer?._id.toString() !== req.user._id.toString()
  ) {
    throw new AppError("Access denied", 403);
  }

  res.status(200).json({
    success: true,
    case: singleCase,
  });
};



export const assignJudge = async (req, res) => {

  const { judgeId } = req.body;

    
  if (!judgeId) {
      return res.status(200).json({
        success: true,
        message: "No judge update requested.",
      })}


  const judge = await User.findById(judgeId);

  if (!judge) {
    throw new AppError("Judge not found", 404);
  }

  if (judge.role !== "Judge") {
    throw new AppError("Selected user is not a Judge", 400);
  }

  const updatedCase = await Case.findByIdAndUpdate(
    req.params.id,
    {
      assignedJudge: judgeId,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("assignedJudge", "fullName email role")
    .populate("assignedLawyer", "fullName email role");

  if (!updatedCase) {
    throw new AppError("Case not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Judge assigned successfully",
    case: updatedCase,
  });
};




export const assignLawyer = async (req, res) => {
  const { lawyerId } = req.body;

  if (!lawyerId) {
      return res.status(200).json({
        success: true,
        message: "No lawyer update requested.",})
  }

  const lawyer = await User.findById(lawyerId);

  if (!lawyer) {
    throw new AppError("Lawyer not found", 404);
  }

  if (lawyer.role !== "Lawyer") {
    throw new AppError("Selected user is not a Lawyer", 400);
  }

  const updatedCase = await Case.findByIdAndUpdate(
    req.params.id,
    {
      assignedLawyer: lawyerId,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("assignedJudge", "fullName email role")
    .populate("assignedLawyer", "fullName email role");

  if (!updatedCase) {
    throw new AppError("Case not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Lawyer assigned successfully",
    case: updatedCase,
  });
};




export const updateCaseStatus = async (req, res) => {
  const { status } = req.body;

  const allowedStatus = [
    "Pending",
    "Ongoing",
    "Adjourned",
    "Completed",
  ];

  if (!allowedStatus.includes(status)) {
    throw new AppError("Invalid case status", 400);
  }

  const updatedCase = await Case.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCase) {
    throw new AppError("Case not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Case status updated successfully",
    case: updatedCase,
  });
};


export const updateCase = async (req, res) => {
  const {
    caseTitle,
    caseType,
    plaintiff,
    defendant,
    filingDate,
  } = req.body;

  const updates = {};

  if (caseTitle) updates.caseTitle = caseTitle;
  if (caseType) updates.caseType = caseType;
  if (plaintiff) updates.plaintiff = plaintiff;
  if (defendant) updates.defendant = defendant;
  if (filingDate) updates.filingDate = filingDate;

  const updatedCase = await Case.findByIdAndUpdate(
    req.params.id,
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCase) {
    throw new AppError("Case not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Case updated successfully",
    case: updatedCase,
  });
};


export const deleteCase = async (req, res) => {
  
  const deletedCase = await Case.findByIdAndDelete(req.params.id);

  if (!deletedCase) {
    throw new AppError("Case not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Case deleted successfully",
  });
};