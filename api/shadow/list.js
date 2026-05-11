import { connectDB } from "../../lib/db.js";
import Response from "../../models/Response.js";
import Teacher from "../../models/Teacher.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  await connectDB();
  if (req.query.all === "true") {
    const teachers = await Teacher.find({}).sort({ count: -1 }).limit(20);
    return res.status(200).json({ leaderboard: teachers });
  }
  const total = await Response.countDocuments();
  const recent = await Response.find({}).sort({ _id: -1 }).limit(10);
  return res.status(200).json({ total, recent: recent.map(r => ({ trigger: r.trigger, responseCount: r.responses.length })) });
}
