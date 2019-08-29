import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { ResultData } from './data.d';
import { getResult } from './service';

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;

export interface ModelType {
  namespace: string;
  state: ResultData;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ResultData>;
    clear: Reducer<any>;
  };
}

const initState = {
  stage: -1,
};

const Model: ModelType = {
  namespace: 'testResult',

  state: initState,

  effects: {
    *fetch({ payload: id }, { call, put }) {
      const response = yield call(getResult, id);
      const { code, message: msg, data } = response;
      if (code === 0) {
        yield put({
          type: 'save',
          payload: data,
        });
      } else {
        message.error(msg);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
