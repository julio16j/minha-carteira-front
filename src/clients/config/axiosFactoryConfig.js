import axios from 'axios';

export default function CreateAxiosInstance (baseURL)  {
  return axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
