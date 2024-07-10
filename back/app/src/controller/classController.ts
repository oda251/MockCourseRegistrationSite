import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Class } from "../types/class";
import { RegisterParams } from "../types/reqParams";
import { ClassRepository } from "../repository/classRepository";
import { StatusCodes } from "http-status-codes";

export interface ClassController {
  fetchClasses(
    request: Request<ParamsDictionary, string, RegisterParams>,
    response: Response<string>,
  ): Promise<Class[] | null>;
  fetchRegistratedClasses(
    request: Request<ParamsDictionary, string, RegisterParams>,
    response: Response<string>,
  ): Promise<Class[] | null>;
  registerClass(
    request: Request<ParamsDictionary, string, RegisterParams>,
    response: Response<string>,
  ): Promise<boolean>;
  registerClass(
    request: Request<ParamsDictionary, string, RegisterParams>,
    response: Response<string>,
  ): Promise<boolean>;
}

export class ClassControllerImpl {
  cr: ClassRepository;
  constructor(cr: ClassRepository) {
    this.cr = cr;
  }
  async fetchClasses(
    request: Request<ParamsDictionary, string, RegisterParams>,
    response: Response<string>,
  ): Promise<Class[] | null> {
    try {
      const classes = await this.cr.fetchClasses();
      if (!classes) {
        response.status(StatusCodes.NOT_FOUND).send("classes not found");
        return null;
      }
      const jsonStr = JSON.stringify(classes);
      response.send(jsonStr);
      return classes;
    } catch (e) {
      throw e;
    }
  }
  async fetchRegistratedClasses(
    request: Request<ParamsDictionary, string, RegisterParams>,
    response: Response<string>,
  ): Promise<Class[] | null> {
    try {
      const userId = request.userId;
      const classes = await this.cr.fetchRegistratedClasses(userId);
      if (!classes) {
        response.status(StatusCodes.NOT_FOUND).send("classes not found");
        return null;
      }
      const jsonStr = JSON.stringify(classes);
      response.send(jsonStr);
      return classes;
    } catch (e) {
      throw e;
    }
  }
  async registerClass(
    request: Request<ParamsDictionary, string, RegisterParams>,
    response: Response<string>,
  ): Promise<boolean> {
    try {
      const userId = request.userId;
      const classId = request.body.classId;
      if (classId <= 0) {
        response.status(StatusCodes.BAD_REQUEST).send("invalid classId");
        return false;
      }
      const classWanted = await this.cr.fetchClass(classId);
      if (!classWanted) {
        response.status(StatusCodes.BAD_REQUEST).send("class not found");
        return false;
      }
      // 実施日程の被りを確認
      const classes = await this.cr.fetchRegistratedClasses(userId);
      if (classes) {
        const isOverlap = classes.some((c) => {
          if (
            c.day === classWanted.day &&
            c.period === classWanted.period &&
            c.semester === classWanted.semester
          ) {
            return true;
          }
          return false;
        });
        if (isOverlap) {
          response
            .status(StatusCodes.BAD_REQUEST)
            .send("another class is already registered on the same time");
          return false;
        }
      }
      const result = await this.cr.registerClass(userId, classId);
      if (!result) {
        response.status(StatusCodes.BAD_REQUEST).send("registration failed");
        return false;
      }
      response.send("registration success");
      return true;
    } catch (e) {
      throw e;
    }
  }
  async unregisterClass(
    request: Request<ParamsDictionary, string, RegisterParams>,
    response: Response<string>,
  ): Promise<boolean> {
    try {
      const userId = request.userId;
      const classId = request.body.classId;
      if (classId <= 0) {
        response.status(StatusCodes.BAD_REQUEST).send("invalid classId");
        return false;
      }
      const result = await this.cr.unregisterClass(userId, classId);
      if (!result) {
        response.status(StatusCodes.BAD_REQUEST).send("unregistration failed");
        return false;
      }
      response.send("unregistration success");
      return true;
    } catch (e) {
      throw e;
    }
  }
}
