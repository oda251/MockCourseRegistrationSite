import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Class } from "../@types/class";
import { ProfessorDataParams } from "../@types/reqParams";
import { StatusCodes } from "http-status-codes";
import { ProfessorRepository } from "../repository/professorRepository";

export interface ProfessorController {
  fetchProfessorData(
    request: Request<ParamsDictionary, string, ProfessorDataParams>,
    response: Response<string>,
  ): Promise<Class[] | null>;
}

export class ProfessorControllerImpl {
  pr: ProfessorRepository;
  constructor(pr: ProfessorRepository) {
    this.pr = pr;
  }
  async fetchProfessorData(
    request: Request<ParamsDictionary, string, ProfessorDataParams>,
    response: Response<string>,
  ): Promise<Class[] | null> {
    try {
      const reqParams = request.body;
      const classes = await this.pr.fetchProfessorClasses(
        reqParams.professorId,
      );
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
}
