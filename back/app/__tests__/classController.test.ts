import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ClassControllerImpl } from '../src/controller/classController';
import { ClassRepository } from '../src/repository/classRepository';
import { StatusCodes } from 'http-status-codes';
import { Class } from '../src/types/class';
import { RegisterParams } from '../src/types/reqparams';

jest.mock('../src/repository/classRepository');

describe('ClassControllerImpl', () => {
    let classController: ClassControllerImpl;
    let mockClassRepository: jest.Mocked<ClassRepository>;

    beforeEach(() => {
        mockClassRepository = {
			fetchClass: jest.fn(),
			fetchClasses: jest.fn(),
			fetchRegistratedClasses: jest.fn(),
			registerClass: jest.fn(),
			unregisterClass: jest.fn(),
		}
        classController = new ClassControllerImpl(mockClassRepository);
    });

    describe('fetchClasses', () => {
        it('should return classes if they exist', async () => {
            const classes: Class[] = [
				{
					id: 1,
					professors: [
						{
							id: 1,
							name: 'Professor 1',
							post: [
								{
									id: 1,
									name: 'Post 1',
								}
							]
						}
					],
					name: 'Class 1',
					credits: 2,
					period: 1,
					semester: 1,
					day: 1,
					summery: 'Summery 1',
				},
				{
					id: 2,
					professors: [
						{
							id: 2,
							name: 'Professor 2',
							post: [
								{
									id: 2,
									name: 'Post 2',
								}
							]
						}
					],
					name: 'Class 2',
					credits: 2,
					period: 1,
					semester: 1,
					day: 1,
					summery: 'Summery 2',
				}
			];
            mockClassRepository.fetchClasses.mockResolvedValue(classes);

            const req = {} as Request<ParamsDictionary, string, RegisterParams>;
            const res = { send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.fetchClasses(req, res, next);

            expect(result).toEqual(classes);
            expect(res.send).toHaveBeenCalledWith(JSON.stringify(classes));
        });

        it('should return 404 if classes do not exist', async () => {
            mockClassRepository.fetchClasses.mockResolvedValue(null);

            const req = {} as Request<ParamsDictionary, string, RegisterParams>;
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.fetchClasses(req, res, next);

            expect(result).toBeNull();
            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.send).toHaveBeenCalledWith('classes not found');
        });
    });

    describe('fetchRegistratedClasses', () => {
        it('should return registered classes for a user', async () => {
            const userId = 1;
            const classes: Class[] = [
				{
					id: 1,
					professors: [
						{
							id: 1,
							name: 'Professor 1',
							post: [
								{
									id: 1,
									name: 'Post 1',
								}
							]
						}
					],
					name: 'Class 1',
					credits: 2,
					period: 1,
					semester: 1,
					day: 1,
					summery: 'Summery 1',
				},
				{
					id: 2,
					professors: [
						{
							id: 2,
							name: 'Professor 2',
							post: [
								{
									id: 2,
									name: 'Post 2',
								}
							]
						}
					],
					name: 'Class 2',
					credits: 2,
					period: 2,
					semester: 1,
					day: 1,
					summery: 'Summery 2',
				}
			];
			mockClassRepository.fetchClass.mockResolvedValue(classes[0]);
            mockClassRepository.fetchRegistratedClasses.mockResolvedValue(classes);

            const req = { userId } as unknown as Request<ParamsDictionary, string, RegisterParams>;
            const res = { send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.fetchRegistratedClasses(req, res, next);

            expect(result).toEqual(classes);
            expect(res.send).toHaveBeenCalledWith(JSON.stringify(classes));
        });

        it('should return 404 if registered classes do not exist', async () => {
            const userId = 1;
            mockClassRepository.fetchRegistratedClasses.mockResolvedValue(null);

            const req = { userId } as unknown as Request<ParamsDictionary, string, RegisterParams>;
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.fetchRegistratedClasses(req, res, next);

            expect(result).toBeNull();
            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.send).toHaveBeenCalledWith('classes not found');
        });
    });

    describe('registerClass', () => {
		const classWanted: Class = {
			id: 3,
			professors: [
				{
					id: 3,
					name: 'Professor 3',
					post: [
						{
							id: 3,
							name: 'Post 3',
						}
					]
				}
			],
			name: 'Class 3',
			credits: 2,
			period: 3,
			semester: 1,
			day: 1,
			summery: 'Summery 3',
		}
		const classes: Class[] = [
			{
				id: 1,
				professors: [
					{
						id: 1,
						name: 'Professor 1',
						post: [
							{
								id: 1,
								name: 'Post 1',
							}
						]
					}
				],
				name: 'Class 1',
				credits: 2,
				period: 1,
				semester: 1,
				day: 1,
				summery: 'Summery 1',
			},
			{
				id: 2,
				professors: [
					{
						id: 2,
						name: 'Professor 2',
						post: [
							{
								id: 2,
								name: 'Post 2',
							}
						]
					}
				],
				name: 'Class 2',
				credits: 2,
				period: 2,
				semester: 1,
				day: 1,
				summery: 'Summery 2',
			}
		];
        it('should register a class successfully', async () => {
            const userId = 1;
            const classId = 3;
			mockClassRepository.fetchClass.mockResolvedValue(classWanted);
			mockClassRepository.fetchRegistratedClasses.mockResolvedValue(classes);
            mockClassRepository.registerClass.mockResolvedValue(true);

            const req = { userId, body: { classId } } as unknown as Request<ParamsDictionary, string, RegisterParams>;
            const res = { send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.registerClass(req, res, next);

            expect(result).toBe(true);
            expect(res.send).toHaveBeenCalledWith('registration success');
        });

		it('should return 401 for double booking', async () => {
			const userId = 1;
            const classId = 3;
			mockClassRepository.fetchClass.mockResolvedValue(classes[0]);
			mockClassRepository.fetchRegistratedClasses.mockResolvedValue(classes);
            mockClassRepository.registerClass.mockResolvedValue(true);

            const req = { userId, body: { classId } } as unknown as Request<ParamsDictionary, string, RegisterParams>;
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.registerClass(req, res, next);

            expect(result).toBe(false);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(res.send).toHaveBeenCalledWith('another class is already registered on the same time');
		});

        it('should return 400 for invalid classId', async () => {
            const userId = 1;
            const classId = -1;

            const req = { userId, body: { classId } } as unknown as Request<ParamsDictionary, string, RegisterParams>;
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.registerClass(req, res, next);

            expect(result).toBe(false);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(res.send).toHaveBeenCalledWith('invalid classId');
        });

        it('should return 400 if registration fails', async () => {
            const userId = 1;
            const classId = 1;
			mockClassRepository.fetchClass.mockResolvedValue(classWanted);
			mockClassRepository.fetchRegistratedClasses.mockResolvedValue(classes);
            mockClassRepository.registerClass.mockResolvedValue(false);

            const req = { userId, body: { classId } } as unknown as Request<ParamsDictionary, string, RegisterParams>;
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.registerClass(req, res, next);

            expect(result).toBe(false);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(res.send).toHaveBeenCalledWith('registration failed');
        });
    });

    describe('unregisterClass', () => {
        it('should unregister a class successfully', async () => {
            const userId = 1;
            const classId = 1;
            mockClassRepository.unregisterClass.mockResolvedValue(true);

            const req = { userId, body: { classId } } as unknown as Request<ParamsDictionary, string, RegisterParams>;
            const res = { send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.unregisterClass(req, res, next);

            expect(result).toBe(true);
            expect(res.send).toHaveBeenCalledWith('unregistration success');
        });

        it('should return 400 for invalid classId', async () => {
            const userId = 1;
            const classId = -1;

            const req = { userId, body: { classId } } as unknown as Request<ParamsDictionary, string, RegisterParams>;
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.unregisterClass(req, res, next);

            expect(result).toBe(false);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(res.send).toHaveBeenCalledWith('invalid classId');
        });

        it('should return 400 if unregistration fails', async () => {
            const userId = 1;
            const classId = 1;
            mockClassRepository.unregisterClass.mockResolvedValue(false);

            const req = { userId, body: { classId } } as unknown as Request<ParamsDictionary, string, RegisterParams>;
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response<string>;
            const next = jest.fn();

            const result = await classController.unregisterClass(req, res, next);

            expect(result).toBe(false);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(res.send).toHaveBeenCalledWith('unregistration failed');
        });
    });
});
