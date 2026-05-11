import { connectDB } from "../../lib/db.js";
import Response from "../../models/Response.js";
import Teacher from "../../models/Teacher.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { trigger, responses, userID } = req.body;
  if (!trigger || !responses || !userID) return res.status(400).json({ error: "trigger, responses, userID required" });
  await connectDB();
  const triggerClean = trigger.toLowerCase().trim();
  const responseArray = Array.isArray(responses) ? responses : [responses];
  let doc = await Response.findOne({ trigger: triggerClean });
  if (doc) { doc.responses.push(...responseArray); await doc.save(); }
  else { doc = await Response.create({ trigger: triggerClean, responses: responseArray }); }
  await Teacher.findOneAndUpdate({ userID }, { $inc: { count: 1 } }, { upsert: true });
  return res.status(200).json({ success: true, message: `Taught: "${triggerClean}"` });
}
