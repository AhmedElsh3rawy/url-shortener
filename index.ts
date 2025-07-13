import type { Request, Response } from "express";
import express from "express";
import morgan from "morgan";
import path from "node:path";
import { initRedisClient } from "./utils/client";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/shorten", async (req: Request, res: Response) => {
	const { url } = req.body;
	if (!url) return res.status(400).json({ message: "URL is required." });

	try {
		const client = await initRedisClient();
		const shortId = Math.random().toString(36).substring(2, 8);

		await client.set(shortId, url, {
			EX: 60 * 60 * 24 * 7,
			NX: true,
		});

		return res.status(201).json({
			shortUrl: `/${shortId}`,
			originalUrl: url,
			expiresIn: "7 days",
		});
	} catch (error) {
		console.error("Redis error:", error);
		return res.status(500).json({ message: "Failed to create short URL" });
	}
});

app.get("/:shortId", async (req: Request, res: Response) => {
	const shortId = req.params.shortId;
	const client = await initRedisClient();
	const originalUrl = await client.get(shortId);

	if (originalUrl) {
		res.redirect(originalUrl);
	} else {
		res.status(404).send("Not found");
	}
});

app.listen(PORT, () => console.log(`[server]: Listening on port ${PORT}`));
