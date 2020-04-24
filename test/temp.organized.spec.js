
//Feel free to delete this temporary test file

/* 17.14 Building services, p. 15-16

temp.spec.js (reorganized)

When organizing test files, we tend to put all of the hooks at the top of the 
appropriate describe block. We can reorganize the temp.spec.js like so. 
Also, notice that we move any it blocks before their sibling describe blocks.
*/

/*
describe.only(`Temporary spec - top level describe`, () => {
    before(() => {
      console.log('before #1')
    })
  
    before(() => {
      console.log('before #2')
    })
  
    after(() => {
      console.log('after #1')
    })
  
    beforeEach(() => {
      console.log('beforeEach #2')
    })
  
    it(`it #4`, () => {
      console.log('it #4')
    })
  
    it(`it #5`, () => {
      console.log('it #5')
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
        before(() => {
          console.log('before #4')
        })
  
        it(`it #3`, () => {
          console.log('it #3')
        })
      })
    })
  })

*/