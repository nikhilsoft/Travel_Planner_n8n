import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/travel-request", async (req, res) => {
  const payload = req.body;
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (!n8nUrl)
    return res.json({ echo: payload, hint: "Set N8N_WEBHOOK_URL in .env" });
  const r = await fetch(n8nUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await r.json();
  res.json(data);
});

app.listen(4000, () => console.log("Server running on 4000"));
