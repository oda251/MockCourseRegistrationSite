import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Class } from "../types/class";
import { RegisterParams } from "../types/reqparams";
import { ClassRepository } from "../repository/classRepository";
import { StatusCodes } from "http-status-codes";

export interface ClassController {
	fetchClasses(
		request: Request<ParamsDictionary, string, RegisterParams>,
		response: Response<string>,
		next: unknown
	): Promise<Class[] | null>;
	fetchRegistratedClasses(
		request: Request<ParamsDictionary, string, RegisterParams>,
		response: Response<string>,
		next: unknown
	): Promise<Class[] | null>;
	registerClass(
		request: Request<ParamsDictionary, string, RegisterParams>,
		response: Response<string>,
		next: unknown
	): Promise<boolean>;
	registerClass(
		request: Request<ParamsDictionary, string, RegisterParams>,
		response: Response<string>,
		next: unknown
	): Promise<boolean>;
}

export class ClassControllerImpl {
	cr: ClassRepository;
	constructor(cr: ClassRepository) {
		this.cr = cr;
	}
}
