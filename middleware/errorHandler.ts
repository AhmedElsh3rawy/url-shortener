import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(err);
	res.status(err.status || 500).json({ error: err });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	console.log("Route:", req.originalUrl, "NOT FOUND");
	res.status(404).json({
		message: `${req.originalUrl} Not Found`,
	});
};
