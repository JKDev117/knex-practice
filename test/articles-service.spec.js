//17.14 Building services

const ArticlesService = require('../src/articles-service')
const knex = require('knex')

describe('Articles service object', function() {
    let db //variable called db

    //test data
    let testArticles = [
        {
            id: 1,
            date_published: new Date('2029-01-22T16:28:32.615Z'),
            title: 'First test post!',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
        },
        {
            id: 2,
            date_published: new Date('2100-05-22T16:28:32.615Z'),
            title: 'Second test post!',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
        },
        {
            id: 3,
            date_published: new Date('1919-12-22T16:28:32.615Z'),
            title: 'Third test post!',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'
        },
    ]

    //make the knex instance before the tests run
    //and save it in a variable called db (p. 12)
    //see https://mochajs.org/#hooks
    //before(function(){// runs once before the first test in this block})
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    //removes all the rows before we insert new test data (p. 20)
    before(() => db('blogful_articles').truncate())

    //to remove all of the data after each test (p. 24)
    afterEach(() => db('blogful_articles').truncate()) 

    //to disconnect from the db at the end of all tests (p. 18)
    after(() => db.destroy())


    /* Note, the context function is a synonym for the describe function. We can interchange them 
    with no functional difference. The reason to use context here is for the semantics of 
    reading the test code to see that we're setting a "context" of state for a group of tests. */
    context(`Given 'blogful_articles' has data`, () => {
        //before each individual test in scope, pg. 28
        beforeEach(() => {
            return db
                .into('blogful_articles') //'blogful_articles' is name of our table
                //insert the test articles into the test db 
                .insert(testArticles)
                //the knexInstance.insert() method also returns a promise so we
                //can utilize the features of mocha by returning that promise from the
                //before callback function and mocha will wait for the SQL to insert
                //to complete before executing the tests (p. 17-18)
        })

        it(`getAllArticles() resolves all articles from 'blogful_articles' table`, () => {
            //test that ArticlesService.getAllArticles gets data from the table
            return ArticlesService.getAllArticles(db)
                .then(actual => {
                    expect(actual).to.eql(testArticles)
                })
        })
        /*^^ Note: There may be issues here due to timezones, daylight savings time, etc... 
        If you're having issues with the dates being slightly different, 
        change the endpoint handler to run each article's date_published through a new Date constructor:
        
        it(`getAllArticles() resolves all articles from 'blogful_articles' table`, () => {
            return ArticlesService.getAllArticles(db)
                .then(actual => {
                    expect(actual).to.eql(testArticles.map(article => ({
                        ...article,
                        date_published: new Date(article.date_published)
                    })))
                })
        }) */

        //test for getting a specific article by ID (p. 27)
        it(`getById() resolves an article by id from 'blogful_articles' table`, () => {
              const thirdId = 3
              const thirdTestArticle = testArticles[thirdId - 1]
              return ArticlesService.getById(db, thirdId)
                .then(actual => {
                  expect(actual).to.eql({
                    id: thirdId,
                    title: thirdTestArticle.title,
                    content: thirdTestArticle.content,
                    date_published: thirdTestArticle.date_published,
                  })
                })
        })

        
        //test given the table has data and assert that the article is removed
        //after the delete has taken place (p. 29)
        it(`deleteArticle() removes an article by id from 'blogful_articles' table`, () => {
             const articleId = 3
             return ArticlesService.deleteArticle(db, articleId)
               .then(() => ArticlesService.getAllArticles(db))
               .then(allArticles => {
                 // copy the test articles array without the "deleted" article
                 const expected = testArticles.filter(article => article.id !== articleId)
                 expect(allArticles).to.eql(expected)
               })
        })

        //test to ensure that the specific article has been updated (p. 29)
        it(`updateArticle() updates an article from the 'blogful_articles' table`, () => {
             const idOfArticleToUpdate = 3
             const newArticleData = {
               title: 'updated title',
               content: 'updated content',
               date_published: new Date(),
             }
             return ArticlesService.updateArticle(db, idOfArticleToUpdate, newArticleData)
               .then(() => ArticlesService.getById(db, idOfArticleToUpdate))
               .then(article => {
                 expect(article).to.eql({
                   id: idOfArticleToUpdate,
                   ...newArticleData,
                 })
               })
        })
        

    })

    //to test when the database is empty (p. 23)
    context(`Given 'blogful_articles' has no data`, () => {
       it(`getAllArticles() resolves an empty array`, () => {
         return ArticlesService.getAllArticles(db)
           .then(actual => {
             expect(actual).to.eql([])
           })
       })

       it(`insertArticle() inserts a new article and resolves the new article with an 'id'`, () => {
           const newArticle = {
               title: 'Test new title',
               content: 'Test new content',
               date_published: new Date('2020-01-01T00:00:00.00Z')
           }
           return ArticlesService.insertArticle(db, newArticle)
                //to assert that the method resolves the newly created article with an incremented ID; the ID
                //should be '1', as the table is empty. (p. 26)
               .then(actual => {
                   expect(actual).to.eql({
                       id: 1,
                       title: newArticle.title,
                       content: newArticle.content,
                       date_published: newArticle.date_published,
                       //^^ Note: Note: again, there may be issues with daylight savings times and timezones between your machine and PostgreSQL. 
                       //To fix them, run the dates from your database through new Date constructor to force it into your current timezone. (p. 27)
                       //date_published: newArticle.date_published,
                   })
               })
       })

    })
    

})



/* Note:
Mocha offers the following 4 hooks:

    before runs once before all tests in scope
    after runs once after all tests in scope
    beforeEach runs before each individual test in scope
    afterEach runs after each individual test in scope

The ordering of identical hooks matters! E.g. If you have three before() hooks, they will 
sequentially run in order of declaration. However, differing hooks will run in the expected 
sequence regardless of statement order. (p. 21)    
*/