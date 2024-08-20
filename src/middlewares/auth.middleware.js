import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  console.log("Request ", req.cookies);
  try {
    const accessToken =
      req.cookies.accessToken ||
      req.header("Authorization").replace("Bearer ", "");

    if (!accessToken) {
      throw new ApiError(400, "Unauthorized Access");
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid AccessToken");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Something went wrong");
  }
});
