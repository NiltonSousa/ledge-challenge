import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './application/controllers/account.controller';
import { AccountService } from './application/services/account.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(AccountController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
