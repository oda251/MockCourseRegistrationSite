import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import bcrypt from "bcrypt";
import { UserRepository } from "../repository/userRepository";
import { sign } from "jsonwebtoken";
import { JwtPayload, LoginParams } from "../types/auth";
import { UserInfo } from "../types/user";

export class UserControllerImpl {
	ur: UserRepository;
	constructor(ur: UserRepository) {
		this.ur = ur;
	}
	async loginHandler(
		request: Request<ParamsDictionary, string, LoginParams>,
		response: Response<string>,
		next: unknown
	): Promise<void> {
		try {
			const { email, password } = request.body;
			// ユーザの検索
			const user = await this.ur.findByEmail(email);
			if (!user) {
				response.status(401).send("authentication failed");
				return;
			}
			// パスワードの照合
			const isPasswordCorrect = await bcrypt.compare(password, user.password);
			if (!isPasswordCorrect) {
				response.status(401).send("authentication failed");
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

export interface UserController {
	loginHandler(
		request: Request<ParamsDictionary, string, LoginParams>,
		response: Response<string>,
		next: unknown
	): Promise<void>;
}