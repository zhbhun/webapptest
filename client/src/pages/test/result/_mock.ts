import { ResultResponse } from './data.d';
import browsertime from './browsertime';
import har from './browsertime.har';

const getResult: ResultResponse = {
  code: 0,
  data: {
    stage: 1,
  },
  message: 'success',
};

const getResultSuccess: ResultResponse = {
  code: 0,
  data: {
    stage: 0,
    info: {
      url: 'https://www.baidu.com',
      timestamp: new Date().toString(),
      browser: 'iPhone 6',
      network: '3G',
      localtion: '厦门',
    },
    browsertime,
    har,
  },
  message: 'success',
}

export default {
  'GET  /api/test/result': getResultSuccess,
};
