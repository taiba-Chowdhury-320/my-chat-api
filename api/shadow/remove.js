import { connectDB } from "../../lib/db.js";
import Response from "../../models/Response.js";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed" });
  const { trigger, index } = req.body;
  if (!trigger || index === undefined) return res.status(400).json({ error: "trigger and index required" });
  await connectDB();
  const doc = await Response.findOne({ trigger: trigger.toLowerCase().trim() });
  if (!doc) return res.status(404).json({ error: "Trigger not found" });
  doc.responses.splice(index, 1);
  if (doc.responses.length === 0) { await Response.deleteOne({ _id: doc._id }); }
  else { await doc.save(); }
  return res.status(200).json({ success: true, message: "Removed" });
}
