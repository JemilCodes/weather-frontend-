import request from './request';

export default async function postData<T, R>(url: string, data: T): Promise<R> {
  const response = await request(`${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  });
  return response;
}