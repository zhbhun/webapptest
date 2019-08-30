import request from '@/utils/request';
import mock from '@/pages/account/center/_mock';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return Promise.resolve(mock['GET  /api/currentUser']);
  // return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return Promise.resolve([]);
  // return request('/api/notices');
}
