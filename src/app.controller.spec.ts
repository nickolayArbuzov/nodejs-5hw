import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/filters/http-exeption.filter';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  const blogController = '/blogs';
    const postController = '/posts';
    const testingController = '/testing';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const customErrors = [];
        errors.forEach(e => {
          const keys = Object.keys(e.constraints)
          keys.forEach(k => {
            customErrors.push({
              message: e.constraints[k],
              field: e.property,
            })
          })
        })
        throw new BadRequestException(customErrors)
      }
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const url = `${testingController}/all-data`;
    await request(app.getHttpServer()).delete(url);
    console.log('before-each')
  });

  describe('/post (GET)', () => {
    const postUrl = `${postController}`;
    
    it('get post , ', async () => {
      console.log('getpost')
      // add some services for prepare data in db

      const response = await request(app.getHttpServer()).get(postUrl)
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    

  });
});