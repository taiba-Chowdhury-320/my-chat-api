import { connectDB } from "../../lib/db.js";
import Response from "../../models/Response.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { text, style = 1 } = req.body;
  if (!text) return res.status(400).json({ error: "text is required" });
  await connectDB();
  const input = text.toLowerCase().trim();
  let match = await Response.findOne({ trigger: input });
  if (!match) {
    const all = await Response.find({});
    match = all.find(doc => input.includes(doc.trigger) || doc.trigger.includes(input));
  }
  if (!match || !match.responses.length) {
    return res.status(200).json({ reply: "Sorry, I don't know yet. Teach me! 😅", found: false });
  }
  const replies = match.responses;
  const reply = style == 2 ? replies[Math.floor(Math.random() * replies.length)] : replies[0];
  return res.status(200).json({ reply, found: true });
}
