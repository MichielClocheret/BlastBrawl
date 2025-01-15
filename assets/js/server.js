const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000; // Of een andere poort

app.get("/youtube-feed", async (req, res) => {
    const channelId = "UCjZE5p1omss8ZnrT4InfZHA"; // Jouw kanaal-ID
    try {
        const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
        if (!response.ok) {
            return res.status(response.status).send("Error fetching YouTube feed.");
        }
        const data = await response.text();
        res.set("Content-Type", "text/xml");
        res.send(data);
    } catch (error) {
        console.error("Error fetching YouTube feed:", error);
        res.status(500).send("Server error.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
