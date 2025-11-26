import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
