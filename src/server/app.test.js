const request = require('supertest');
const app = require('./app');
require('dotenv').config()

const TEST_USER_TOKEN = process.env.TEST_USER_TOKEN


// const 