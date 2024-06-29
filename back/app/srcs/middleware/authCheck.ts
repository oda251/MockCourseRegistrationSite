import { JwtPayload } from "../../types/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authCheck = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		const { token } = request.cookies;
		if (!token) {
			throw new Error();
		}
		const { email } = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
		request.userId = email;
		next();
	} catch {
		response.clearCookie("token");
		response.status(401).send("Authentication failed");
	}
}