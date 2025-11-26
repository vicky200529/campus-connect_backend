import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, department, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      department,
      password: hashed,
      avatar: `https://ui-avatars.com/api/?name=${name}`
    });

    return res.json({ message: "Registered Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });

    return res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        department: user.department,
        avatar: user.avatar
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
