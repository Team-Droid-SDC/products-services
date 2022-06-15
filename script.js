import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 200 },
    { duration: '30s', target: 400 },
    { duration: '30s', target: 600 },
    { duration: '30s', target: 800 },
    { duration: '30s', target: 1000 },
  ]
}

export default function () {
  http.get('http://localhost:3000/products');
  http.get('http://localhost:3000/products/1');
  http.get('http://localhost:3000/products/1/related');
  http.get('http://localhost:3000/products/1/styles');
  sleep(1);
}
