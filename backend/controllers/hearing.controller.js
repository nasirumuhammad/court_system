import Hearing from "../models/hearing.model.js";
import Case from "../models/case.model.js";
import AppError from "../utils/AppError.js";


export const createHearing = async (req, res, next) => {
    
  try {
    const { caseId, hearingDate, hearingTime, courtRoom, notes } = req.body;

    if (!caseId || !hearingDate || !hearingTime || !courtRoom) {
      return next(new AppError("All required fields must be provided", 400));
    }

    // Check if the case exists
    const existingCase = await Case.findById(caseId);

    if (!existingCase) {
      return next(new AppError("Case not found", 404));
    }

    // Prevent scheduling hearings for completed cases
    if (existingCase.status === "Completed") {
      return next(
        new AppError("Cannot schedule a hearing for a completed case", 400)
      );
    }

    const hearing = await Hearing.create({
      caseId,
      hearingDate,
      hearingTime,
      courtRoom,
      notes,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Hearing scheduled successfully",
      hearing,
    });
  } catch (err) {
    next(err);
  }
};


export const getAllHearings = async (req, res, next) => {
  try {
    const {
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (search) {
      const cases = await Case.find({
        caseTitle: {
          $regex: search,
          $options: "i",
        },
      }).select("_id");

      filter.caseId = {
        $in: cases.map((c) => c._id),
      };
    }

    const totalHearings = await Hearing.countDocuments(filter);

    const hearings = await Hearing.find(filter)
      .populate(
        "caseId",
        "caseNumber caseTitle status"
      )
      .populate(
        "createdBy",
        "fullName email role"
      )
      .sort({
        hearingDate: 1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      hearings,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(
          totalHearings / limit
        ),
        totalHearings,
      },
    });

  } catch (err) {
    next(err);
  }
};


export const getHearingsByCase = async (req, res, next) => {
  try {
    const hearings = await Hearing.find({
      caseId: req.params.caseId,
    })
      .populate("caseId")
      .populate("createdBy", "fullName email role")
      .sort({ hearingDate: 1 });

    res.status(200).json({
      success: true,
      count: hearings.length,
      hearings,
    });
  } catch (err) {
    next(err);
  }
};


export const getHearingById = async (req, res, next) => {
  try {
    const hearing = await Hearing.findById(req.params.id)
      .populate("caseId")
      .populate("createdBy", "fullName email role");

    if (!hearing) {
      return next(new AppError("Hearing not found", 404));
    }

    res.status(200).json({
      success: true,
      hearing,
    });
  } catch (err) {
    next(err);
  }
};


export const updateHearing = async (req, res, next) => {
  try {
    const { hearingDate, hearingTime, courtRoom, notes } = req.body;

    const updates = {};

    if (hearingDate) updates.hearingDate = hearingDate;
    if (hearingTime) updates.hearingTime = hearingTime;
    if (courtRoom) updates.courtRoom = courtRoom;
    if (notes !== undefined) updates.notes = notes;

    const hearing = await Hearing.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!hearing) {
      return next(new AppError("Hearing not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Hearing updated successfully",
      hearing,
    });
  } catch (err) {
    next(err);
  }
};


export const deleteHearing = async (req, res, next) => {
  try {
    const hearing = await Hearing.findByIdAndDelete(req.params.id);

    if (!hearing) {
      return next(new AppError("Hearing not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Hearing deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};