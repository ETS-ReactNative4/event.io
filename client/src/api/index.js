import path from 'path';
const baseURL = 'http://192.168.1.5:3000';
const obj = {
  login: async function(email, password) {
    return await fetch(path.join(baseURL, '/auth/login'), {
      method: 'post',
      body: JSON.stringify({ email, password }),
    });
  },
};

export default obj;
