import request from '@/utils/request';

export async function getResult(id: string) {
  return request(`/api/test/result?id=${id}`);
}
