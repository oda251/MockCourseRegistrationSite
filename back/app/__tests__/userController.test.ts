import { UserControllerImpl } from '../src/controller/userController';
import { UserRepository } from '../src/repository/userRepository';
import express from 'express';
import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../src/types/user';

// モック関数の設定
jest.mock('bcrypt');
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('UserControllerImpl', () => {
  let app: express.Express;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    mockUserRepository = {
      findByEmail: jest.fn(),
    };
    const userController = new UserControllerImpl(mockUserRepository);
    app.post('/login', (req, res, next) => userController.login(req, res, next));
  });

  it('should authenticate a user with correct credentials', async () => {
	const password = 'password';
    const mockUser: User = {
		id: 1,
		email: 'test@example.com',
		name: 'test',
		credits: 32,
		password: bcrypt.hashSync(password, 10),
	}
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('fake_jwt_token');

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: password });

    expect(response.status).toBe(200);
	const cookies = response.headers['set-cookie'];
	expect(cookies[0]).toContain('token=fake_jwt_token');
    expect(response.text).toContain('test@example.com');
  });

  it('should reject a user with incorrect credentials', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const response = await request(app)
      .post('/login')
      .send({ email: 'wrong@example.com', password: 'password' });

    expect(response.status).toBe(401);
    expect(response.text).toBe('authentication failed');
  });
});