import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  user: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
}, { timestamps: true });

export default mongoose.model("Notice", noticeSchema);