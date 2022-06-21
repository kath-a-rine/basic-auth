'use strict';

const { server, sequelize } = require('../src/server');
const base64 = require('base-64');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll (async () => {
  await sequelize.sync();
});

afterAll (async () => {
  await sequelize.drop();
});

describe('Auth Tests', () => {
  test('POST - sign up to create a new user', async () => {
    let response = await (await mockRequest.post('/signup')).setEncoding({
      username: 'test',
      password: 'blink182',
    });
    console.log('Response Body', response.body);
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('test');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('blink182');
  });

  test('POST - sign in to login as an existing user', async () => {

  });
});
