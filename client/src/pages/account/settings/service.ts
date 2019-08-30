import request from '@/utils/request';
import mock from './_mock';

export async function queryCurrent() {
  return Promise.resolve(mock['GET  /api/currentUser']);
  // return request('/api/currentUser');
}

export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}
