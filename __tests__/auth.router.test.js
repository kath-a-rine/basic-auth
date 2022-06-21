'use strict';
const { server } = require('../src/server');
const { sequelize } = require('../src/auth/models');
const base64 = require('base-64');
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe('testing our auth features', () => {

  it('Should allow users to signup, with a POST to `signup', async () => {
    let response = await request.post('/signup').send({
      username: 'tester',
      password: 'tester123',
    });

    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('tester');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('tester123');
  });

  it('should allow a user to `signin` with the correct password', async () => {
    let authString = 'tester:tester123';
    let encodedString = base64.encode(authString);
    let response = await request.post('/signin').set('Authorization', `Basic ${encodedString}`);

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('tester');
  });
});
