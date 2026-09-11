require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-5.6-luna";

if (!process.env.OPENAI_API_KEY) {
    console.error("ERROR: OPENAI_API_KEY belum diatur.");
    process.exit(1);
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Index.html"));
});

app.post("/api/chat", async (req, res) => {
    try {
        const message = typeof req.body?.message === "string"
            ? req.body.message.trim()
            : "";

        if (!message) {
            return res.status(400).json({
                error: "Pesan tidak boleh kosong."
            });
        }

        const response = await client.responses.create({
            model: MODEL,
            input: message
        });

        res.json({
            reply: response.output_text || "Maaf, Timy belum menerima jawaban."
        });
    } catch (error) {
        console.error("AI API error:", error);

        res.status(500).json({
            error: "Timy sedang mengalami masalah saat menghubungi AI."
        });
    }
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Timy backend berjalan di port ${PORT}`);
});
