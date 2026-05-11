import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  trigger: { type: String, required: true, unique: true, lowercase: true, trim: true },
  responses: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.models.Response || mongoose.model("Response", ResponseSchema);
