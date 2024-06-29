import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import bcrypt from "bcrypt";
import UserRepository from "../repository/userRepository";
import { sign } from "jsonwebtoken";
import { JwtPayload, UserInfo } from "../../types/auth";

export class UserController {
	static async loginHandler(
		request: Request<ParamsDictionary, string, { email: string; password: string }>,
		response: Response<string>,
		next: unknown
	): Promise<void> {
		try {
			const { email, password } = request.body;
			// ユーザの検索
			const user = await UserRepository.findByEmail(email);
			if (!user) {
				response.status(401).send("user not found");
				return;
			}
			// パスワードの照合
			const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
			if (!isPasswordCorrect) {
				response.status(401).send("password is incorrect");
				return;
			}
			// JWTの生成
			const jwtPayload: JwtPayload = {
				email: user.email,
			};
			const token = sign(jwtPayload, process.env.JWT_SECRET as string, {
				expiresIn: "1h"
			});
			// CookieにJWTをセット
			response.cookie("token", token, {
				httpOnly: true,
				secure: true,
			});
			
			// ユーザ情報の返却
			const userInfo: UserInfo = user
			const jsonStr = JSON.stringify(userInfo);
			response.send(jsonStr);
		} catch (e) {
			throw e;
		}
	}
}
