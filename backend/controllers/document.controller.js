import Document from "../models/document.model.js";
import Case from "../models/case.model.js";
import AppError from "../utils/AppError.js";



export const createDocument = async (req, res) => {
  const { caseId, title, description } = req.body;

  if (!caseId || !title || !description) {
    throw new AppError("All required fields must be provided", 400);
  }

  const existingCase = await Case.findById(caseId);

  if (!existingCase) {
    throw new AppError("Case not found", 404);
  }

  const document = await Document.create({
    caseId,
    title,
    description,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Document added successfully",
    document,
  });
};



export const getAllDocuments = async (req, res) => {
  const {
    search = "",
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const documents = await Document.find(filter)
    .populate("caseId")
    .populate("createdBy", "fullName email role")
    .skip(skip)
    .limit(Number(limit));

  const total = await Document.countDocuments(filter);

  res.status(200).json({
    success: true,
    documents,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  });
};

export const getDocumentById = async (req, res) => {
  const document = await Document.findById(req.params.id)
    .populate("caseId")
    .populate("createdBy", "fullName email role");

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  res.status(200).json({
    success: true,
    document,
  });
};


export const getDocumentsByCase = async (req, res) => {
  const documents = await Document.find({
    caseId: req.params.caseId,
  })
    .populate("createdBy", "fullName email role")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: documents.length,
    documents,
  });
};


export const updateDocument = async (req, res) => {
  const { title, description } = req.body;

  const updates = {};

  if (title) updates.title = title;
  if (description) updates.description = description;

  const document = await Document.findByIdAndUpdate(
    req.params.id,
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Document updated successfully",
    document,
  });
};


export const deleteDocument = async (req, res) => {
  const document = await Document.findByIdAndDelete(req.params.id);

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Document deleted successfully",
  });
};