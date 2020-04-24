//see package.json
//"test": "mocha --require test/setup.js",

//to make sure the env variables are loaded when we run tests
require('dotenv').config() //17.14 (p. 12)

//to avoid needing to require expect
//and supertest in every file
//and to be able to add these functions
//as globals inside tests
const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest


