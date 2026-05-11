import { connectDB } from "../../lib/db.js";
import Response from "../../models/Response.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const { userMessage } = req.query;
  if (!userMessage) return res.status(400).json({ error: "userMessage required" });
  await connectDB();
  const results = await Response.find({ trigger: { $regex: userMessage.toLowerCase().trim(), $options: "i" } }).limit(10);
  return res.status(200).json({ count: results.length, results: results.map(r => ({ trigger: r.trigger, responses: r.responses })) });
}
