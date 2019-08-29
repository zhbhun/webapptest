import request from '@/utils/request';

export async function analysis(data: { url: string }) {
  return request('/api/test/analysis', {
    method: 'post',
    data,
  });
}
