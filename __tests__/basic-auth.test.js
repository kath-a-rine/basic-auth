'use strict';

const { server } = require('../src/server');
const { sequelize } = require('../src/auth/models/index');
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
  it('POST - sign up to create a new user', async () => {
    let response = await mockRequest.post('/signup').send({
      username: 'test',
      password: 'blink182',
    });
    console.log('Response Body', response.body);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('test');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('blink182');
  });

  it('POST - sign in to login as an existing user', async () => {
    let authString = 'test:blink182';
    let encodedString = base64.encode(authString);
    let response = await mockRequest.post('/signin').set('Authorization', `Basic ${encodedString}`);

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('test');
  });
});
