import express from "express";

const app = express();

const PORT = (process.env.PORT as unknown as number) || 8080;

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.listen(PORT, () => console.log(`[server]: Listening on port ${PORT}`));
