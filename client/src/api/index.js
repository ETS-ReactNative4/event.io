import path from 'path';
const baseURL = 'http://192.168.1.5:3001';

export default {
  async get(endpoint, token) {
    const res = await fetch(path.join(baseURL, endpoint), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },
  async post(endpoint, token, body) {
    const res = await fetch(path.join(baseURL, endpoint), {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return res;
  },
};
