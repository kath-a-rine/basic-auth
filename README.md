# Lab 06: Authentication

## Author: Katharine Swilley

### Problem Domain

Authentication System Phase 1: Deploy an Express server that implements Basic Authentication, with sign up and sign in capabilities, using a Postgres database for storage.

### Links and Resources

- [ci/cd - GitHub Actions](https://github.com/kath-a-rine/bearer-auth/actions)
- [back-end server url]


### Setup

#### `.env` requirements

- `PORT` - 3001

#### How to initialize/run your application

View deployed application on Heroku

- install dependencies
- turn on local server with `nodemon` command
- test application with `npm test` command

#### How to use your library

#### Features / Routes

Authentication System Phase 1: Deploy an Express server that implements Basic Authentication, with sign up and sign in capabilities, using a Postgres database for storage.

#### Tests

<!-- Tests in `rest.test.js` include the following: -->

- POST to /sign up to create a new user
- POST to /sign in to login as a user (use basic auth)

Need tests for auth middleware and the routes

- Does the middleware function (send it a basic header)
- Do the routes assert the requirements (sign up/sign in)

This is going to require more “end to end” testing that you’ve done in the past

- To test sign in, your tests actually need to create a user first, then try and login, so there’s a dependency built in


<!-- #### UML

Link to an image of the UML for your application and response to events -->
