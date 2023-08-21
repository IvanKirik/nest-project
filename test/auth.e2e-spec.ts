import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { disconnect } from 'mongoose';
import { AppModule } from "../src/app.module";
import { AuthDto } from "../dist/auth/dto/auth.dto";
import * as request from 'supertest';

const loginDto: AuthDto = {
  login: 'test',
  password: 'test'
}

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  it('/auth/login (POST) - success', async  () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({body}: request.Response) => {
        expect(body.access_token).toBeDefined();
      })
  });

  it('/auth/login (POST) - fail password',   () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...loginDto, password: '3'})
      .expect(401, {
        message: "Неверный пароль!",
        error: "Unauthorized",
        statusCode: 401
      })
  });

  it('/auth/login (POST) - fail login',   () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...loginDto, login: '3'})
      .expect(401, {
        message: "Пользователь с таким email не найден!",
        error: "Unauthorized",
        statusCode: 401
      })
  });


  afterAll(() => {
    disconnect();
  });
});
