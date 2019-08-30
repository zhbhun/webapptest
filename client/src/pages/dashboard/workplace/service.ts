import request from '@/utils/request';
import mock from './_mock';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryCurrent() {
  return Promise.resolve(mock['GET  /api/currentUser']);
  // return request('/api/currentUser');
}
