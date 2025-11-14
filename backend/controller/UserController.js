import { usermodel } from '../model/UserModel.js';
import { generateToken } from '../utils/generate_token.js';
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

// ===============================
// REGISTER OR SIGNUP
// ===============================
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        error: true,
        success: false
      });
    }

    const findUser = await usermodel.findOne({ email });

    if (findUser) {
      return res.status(401).json({
        message: 'User already exists with this email',
        error: true,
        success: false
      });
    }

    let imageUrl = null;

    // ✅ Handle file upload inside function
    if (req.file) {
      console.log("⏳ Uploading image to Cloudinary...");
      const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
        folder: "users",
        resource_type: "auto"
      });
      imageUrl = uploadResponse.secure_url;
      console.log("✅ Image uploaded:", imageUrl);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createNewUser = new usermodel({
      fullName,
      email,
      password: hashedPassword,
      image: imageUrl || null
    });

    const newUserData = await createNewUser.save();

    return res.status(201).json({
      message: 'User created successfully',
      data: newUserData,
      error: false,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      error: true,
      success: false
    });
  }
};

// ===============================
// LOGIN
// ===============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        error: true,
        success: false
      });
    }

    const findUser = await usermodel.findOne({ email });

    if (!findUser) {
      return res.status(404).json({
        message: 'User does not exist',
        error: true,
        success: false
      });
    }

    const comparePass = await bcrypt.compare(password, findUser.password);

    if (!comparePass) {
      return res.status(401).json({
        message: 'Wrong password',
        error: true,
        success: false
      });
    }

    const jwtToken = await generateToken(findUser);

    return res
      .status(200)
      .cookie('accessToken', jwtToken.accessToken, jwtToken.Options)
      .json({
        message: 'Login Successful',
        error: false,
        success: true
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      error: true,
      success: false
    });
  }
};
