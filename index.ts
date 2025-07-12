import type { Request, Response } from "express";
import express from "express";
import { errorHandler, notFound } from "./middleware/errorHandler";

const app = express();

const PORT = (process.env.PORT as unknown as number) || 8080;

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, World!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`[server]: Listening on port ${PORT}`));
