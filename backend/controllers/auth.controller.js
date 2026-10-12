import jwt from 'jsonwebtoken';

import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { setCookies } from "../utils/setCookies.js";


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    // 2. Find user (include password)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    // 3. Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    // 4. Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // 5. Set cookies
    setCookies(res, accessToken, refreshToken);

    // 6. Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};


export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};


export const logout = async (req, res) => {
  res.cookie("AccessToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.cookie("RefreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};



export const refreshToken = async (req, res, next) => {

 try {

   const refreshToken = req.cookies.RefreshToken;


   if (!refreshToken) {
     throw new  AppError("No refresh token found", 401);
   }

   // verify refresh token
   const decoded = jwt.verify(
     refreshToken,
     process.env.REFRESH_SECRET
   );

   const user = await User.findById(decoded.id);

   if (!user) {
     throw new AppError("User not found", 404);
   }

   // generate new tokens
   const newAccessToken = generateAccessToken(user._id);
   const newRefreshToken = generateRefreshToken(user._id);

   // reset cookies
   setCookies(res, newAccessToken, newRefreshToken);

   res.status(200).json({
     success: true,
     message: "Token refreshed successfully",
   });

 } catch (error) {
  next(error);
}
  
};