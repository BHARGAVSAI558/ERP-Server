import { db } from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

export const signin = async (req, res) => {
  try {
    const { Password, Email } = req.body;
    const user = await db.findOne({
      Email: Email,
    });

    if (!user) {
      return res.json({
        msg: "error",
        data: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(Password, user.Password);

    if (!validPassword) {
      return res.json({
        msg: "error",
        data: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      msg: "success",
      data: user,
      token: token,
    });
  } catch (err) {
    res.json({
      msg: "error",
      data: err.message,
    });
  }
};

export const signup = async (req, res) => {
  const { Username, Password, Email } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const newUser = await db.create({
      Username: Username,
      Password: hashedPassword,
      Email: Email,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      msg: "created",
      token: token,
    });
  } catch (err) {
    res.json({
      msg: "error in finding",
      data: err.message,
    });
  }
};
