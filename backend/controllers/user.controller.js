import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";


export const createUser = async (req, res, next) => {
  
    const { fullName, email, password, role, phoneNumber } = req.body;

    if (!fullName || !email || !password || !role) {
      throw new AppError("All required fields must be provided", 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }


    const user = await User.create({
      fullName,
      email,
      password,
      role,
      phoneNumber,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
 
};




export const getAllUsers = async (req, res) => {
  const {
    search = "",
    role,
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};

  if (role) {
    filter.role = role;
  }

  if (search) {
    filter.$or = [
      {
        fullName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const users = await User.find(filter)
    .skip(skip)
    .limit(Number(limit));

  const total = await User.countDocuments(filter);

  res.status(200).json({
    success: true,
    users,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  });
};



export const getUserById = async (req, res, next) => {
 
    const user = await User.findById(req.params.id);

    if (!user) throw new AppError("User not found", 404);
  

    res.status(200).json({
      success: true,
      user,
    });
};

export const updateUser = async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    role,
    password,
  } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (fullName) user.fullName = fullName;

  if (email) user.email = email;

  if (phoneNumber) user.phoneNumber = phoneNumber;

  if (role) user.role = role;

  if (password) user.password = password;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
};

export const deleteUser = async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  
};