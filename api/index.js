const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files

// Magic 8-Ball possible answers
const responses = [
  "Yes, absolutely!",
  "No way, try again!",
  "The stars are unsure, ask later.",
  "Most likely, yes!",
  "Don't count on it.",
  "Ask again later.",
  "Definitely!",
  "Not in a million years.",
  "Signs point to yes.",
  "Better not tell you now."
];

// ✅ API for Farcaster Frame
app.get("/frame", (req, res) => {
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    res.json({
        "frames": [
            {
                "image": "https://magic8ball-frame.vercel.app/8ball.png", 
                "post_url": "https://magic8ball-frame.vercel.app/frame",
                "buttons": [
                    { "label": "Ask Again", "action": "post" }
                ],
                "text": `🎱 ${randomResponse}`
            }
        ]
    });
});


// ✅ Serve the frontend page at `/answer`
app.get("/answer", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ API to return a random answer
app.get("/api/answer", (req, res) => {
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ response: randomResponse });
});


// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Magic 8-Ball Frame running on port ${PORT}`);
});
