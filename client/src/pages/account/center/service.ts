import request from '@/utils/request';
import mock from './_mock';

export async function queryCurrent() {
  return Promise.resolve(mock['GET  /api/currentUser']);
  // return request('/api/currentUser');
}

export async function queryFakeList(params: { count: number }) {
  return request('/api/fake_list', {
    params,
  });
}
