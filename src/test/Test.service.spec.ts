import { Test, TestingModule } from '@nestjs/testing';
import TestService from './Test.service';

jest.setTimeout(30000);

describe('TestService', () => {
  let testService: TestService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [TestService],
    }).compile();

    testService = app.get<TestService>(TestService);
  });

  describe('getTestingCount', () => {
    it('should return promise number', () => {
      return testService.getTestingCount().then(count => {
        expect(count >= 0).toBeTruthy();
      });
    });
  });

  describe('runTest', () => {
    it('runTest return json', async () => {
      const id = await testService.analysis('https://www.baidu.com');
      expect(typeof id === 'string').toBeTruthy();
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 3000); // 延迟一会便于查询容器数量
      });
      expect(testService.getPendingCount() === 1).toBeTruthy();
      expect(testService.getPendingCountById(id) === 0).toBeTruthy();
      const count = await testService.getTestingCount();
      expect(count >= 1).toBeTruthy();
    }, 60000);
  });
});
