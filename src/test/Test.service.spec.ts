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
    it('runTest return json', () => {
      const promise = testService.runTest('https://www.baidu.com');
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 3000); // 延迟一会便于查询容器数量
      }).then(() => {
        expect(testService.getPendingCount() === 1).toBeTruthy();
        return testService.getTestingCount().then(count => {
          expect(count >= 1).toBeTruthy();
          return promise.then(json => {
            expect(typeof json === 'object').toBeTruthy();
            expect(typeof json.id === 'string').toBeTruthy();
            expect(typeof json.timestamp === 'number').toBeTruthy();
            expect(typeof json.browsertime === 'object').toBeTruthy();
          });
        });
      });
    }, 60000);
  });
});
