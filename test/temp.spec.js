//Feel free to delete this temporary test file

//17.14 Building services
//p. 13-14

/* Info:
Mocha offers the following 4 hooks:

    before runs once before all tests in scope
    after runs once after all tests in scope
    beforeEach runs before each individual test in scope
    afterEach runs after each individual test in scope

The ordering of identical hooks matters! E.g. If you have three before() hooks, they will 
sequentially run in order of declaration. However, differing hooks will run in the expected 
sequence regardless of statement order. (p. 21)
*/

/* Challenge:
Before you run this file, make a new note file and try to predict the order of each console log. 
The file is very unorganized on purpose to challenge you. 
Once you're confident with your prediction of which console 
logs will happen when, run 'npm test' to see what the result is.
*/

/*
describe.only(`Temporary spec - top level describe`, () => {
    before(() => {
      console.log('before #1')
    })
  
    after(() => {
      console.log('after #1')
    })
  
    beforeEach(() => {
      console.log('beforeEach #2')
    })
  
    before(() => {
      console.log('before #2')
    })
  
    describe(`Describe #1`, () => {
      before(() => {
        console.log('before #3')
      })
  
      after(() => {
        console.log('after #2')
      })
  
      afterEach(() => {
        console.log('afterEach #1')
      })
  
      it(`it #1`, () => {
        console.log('it #1')
      })
  
      it(`it #2`, () => {
        console.log('it #2')
      })
  
      describe(`Describe #2`, () => {
        it(`it #3`, () => {
          console.log('it #3')
        })
  
        before(() => {
          console.log('before #4')
        })
      })
    })
  
    it(`it #4`, () => {
      console.log('it #4')
    })
  
    it(`it #5`, () => {
      console.log('it #5')
    })
  })

*/

/* Solution:
The order that the console logs take place is as follows:

before #1
before #2

beforeEach #2
it #4
beforeEach #2
it #5

    Describe #1
before #3

beforeEach #2
it #1
afterEach #1

beforeEach #2
it #2
afterEach #1

      Describe #2
before #4

beforeEach #2
it #3
afterEach #1

after #2

after #1

*/