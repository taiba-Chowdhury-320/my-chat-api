import { connectDB } from "../../lib/db.js";
import Response from "../../models/Response.js";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).json({ error: "Method not allowed" });
  const { oldTrigger, newResponse } = req.body;
  if (!oldTrigger || !newResponse) return res.status(400).json({ error: "oldTrigger and newResponse required" });
  await connectDB();
  const doc = await Response.findOne({ trigger: oldTrigger.toLowerCase().trim() });
  if (!doc) return res.status(404).json({ error: "Trigger not found" });
  doc.responses = Array.isArray(newResponse) ? newResponse : [newResponse];
  await doc.save();
  return res.status(200).json({ success: true, message: "Updated" });
}
