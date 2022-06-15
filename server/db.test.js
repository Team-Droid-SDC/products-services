const pool = require('./db.js');
const axios = require('axios');
const data = require('./testdata.js');

axios.defaults.baseURL = 'http://localhost:3000';

test('Query for products table work', () => {
  return axios.get('/products')
    .then(response => {
      expect(response.data).toEqual(data.products)
    });
});

test('Query for single product works', () => {
  return axios.get('/products/1')
    .then(response => {
      expect(response.data).toEqual(data.product)
    });
})

test('Query for related products works', () => {
  return axios.get('/products/1/related')
    .then(response => {
      expect(response.data).toEqual(data.related)
    });
})

test('Query for product styles works', () => {
  return axios.get('/products/1/styles')
    .then(response => {
      expect(response.data).toEqual(data.styles)
    });
})