import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);
