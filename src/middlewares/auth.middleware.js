import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  console.log("Request cookies: ", req.cookies);

  try {
    // Extract token from cookies or header
    const accessToken =
      req.cookies.accessToken ||
      (req.header("Authorization") &&
        req.header("Authorization").replace("Bearer ", ""));

    if (!accessToken) {
      throw new ApiError(401, "Unauthorized Access - No token provided");
    }

    // Verify token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log("Decoded Token: ", decodedToken);

    // Find the user from the decoded token
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "User not found with the given token");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid Token");
    } else {
      throw new ApiError(
        401,
        error.message || "Something went wrong during token verification"
      );
    }
  }
});
