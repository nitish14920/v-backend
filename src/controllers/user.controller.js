import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  // check if user already exist
  // validations
  // cloudinary image validation

  const { fullname, email, username, password } = req.body;

  console.log(req.body);
  if ([fullname, email, username].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All field are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  const avatar = await uploadToCloudinary(avatarLocalPath);
  // const coverImage = await uploadToCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  console.log("Avatar", avatar);

  const user = await User.create({
    fullname,
    avatar: avatar,
    coverImage: "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-passowrd -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Somthing went wrong while creating the user");
  }

  return res.status(201).json(new ApiResponse(200, "User created successfuly"));
});
