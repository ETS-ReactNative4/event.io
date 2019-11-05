import { AuthContext } from '../context/AuthContext';
import { useEffect, useContext, useState } from 'react';

const baseURL = 'http://localhost:3000';

export const useHttp = (url, options = {}, dependencies = []) => {
  const auth = useContext(AuthContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  options.headers = options.headers
    ? {
        ...options.headers,
        Authorization: `Bearer ${auth.token}`,
      }
    : {
        Authorization: `Bearer ${auth.token}`,
      };

  useEffect(() => {
    console.log('http request', baseURL + url);
    fetch(baseURL + url, options)
      .then(response => {
        setResponse(response.json());
      })
      .catch(err => setError(err));
  }, dependencies);

  return [response, error];
};
