import { AnyAction } from 'redux';
import router from 'umi/router';
import { message } from 'antd';

import { EffectsCommandMap } from 'dva';
import { analysis } from './service';

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;

export interface ModelType {
  namespace: string;
  state: object;
  effects: {
    submit: Effect;
  };
  reducers: object;
}

const initState = {};

const Model: ModelType = {
  namespace: 'testAnalysis',

  state: initState,

  effects: {
    *submit({ payload: url }, { call, put }) {
      const response = yield call(analysis, { url });
      const { code, data, message: msg } = response;
      if (code === 0) {
        const { id } = data;
        router.push(`/test/results/${id}`);
      } else {
        message.error(msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {},
};

export default Model;
