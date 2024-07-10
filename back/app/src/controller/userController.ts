import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import bcrypt from "bcrypt";
import { UserRepository } from "../repository/userRepository";
import { sign } from "jsonwebtoken";
import { JwtPayload } from "../@types/auth";
import { LoginParams } from "../@types/reqParams";
import { UserInfo } from "../@types/user";
import { StatusCodes } from "http-status-codes";

export class UserControllerImpl {
  ur: UserRepository;
  constructor(ur: UserRepository) {
    this.ur = ur;
  }
  async login(
    request: Request<ParamsDictionary, string, LoginParams>,
    response: Response<string>,
  ): Promise<void> {
    try {
      const reqParams = request.body;
      // ユーザの検索
      const user = await this.ur.findByEmail(reqParams.email);
      if (!user) {
        response.status(StatusCodes.UNAUTHORIZED).send("authentication failed");
        return;
      }
      // パスワードの照合
      const isPasswordCorrect = await bcrypt.compare(
        reqParams.password,
        user.password,
      );
      if (!isPasswordCorrect) {
        response.status(StatusCodes.UNAUTHORIZED).send("authentication failed");
        return;
      }
      // JWTの生成
      const jwtPayload: JwtPayload = {
        userId: user.id,
      };
      const token = sign(jwtPayload, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });
      // CookieにJWTをセット
      response.cookie("token", token, {
        secure: true,
      });

      // ユーザ情報の返却
      const userInfo: UserInfo = user;
      const jsonStr = JSON.stringify(userInfo);
      response.send(jsonStr);
    } catch (e) {
      throw e;
    }
  }
}

export interface UserController {
  login(
    request: Request<ParamsDictionary, string, LoginParams>,
    response: Response<string>,
    next: unknown,
  ): Promise<void>;
}
