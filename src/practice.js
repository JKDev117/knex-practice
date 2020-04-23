//17.13 Databases with Node
//create knex instance to connect to the database

require('dotenv').config()
const knex = require('knex')

//p. 10
const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

/* ----------------------------------------------------------------------------------- */

//to verify we have correctly installed knex & the pg driver (p. 11)
console.log('knex and driver installed correctly \n');


/* ----------------------------------------------------------------------------------- */

//removed //used the toQuery() method which returned a string of the query at its current state for debugging purposes (p. 11-12)
//removed //const q1 = knexInstance('amazong_products').select('*').toQuery() //=> q1: select * from "amazong_products"
//removed //const q2 = knexInstance.from('amazong_products').select('*').toQuery() //=> q2: select * from "amazong_products"
//removed //console.log('q1:', q1)
//removed //console.log('q2:', q2)


/* ----------------------------------------------------------------------------------- */
//p. 13-15

/*
//select the identifier, name, price, and category of a product of interest (p. 14)
//also use .first() method to only select the first item found (p. 15)
const qry = knexInstance
   .select('product_id', 'name', 'price', 'category')
   .from('amazong_products')
   .where({name: 'Point of view gun'})
   .first()
   .then(result => {
       console.log(result)
   })
*/

//take a look at the query that this created for us by using .toQuery() method & console.log the return value (p. 15)
const qry = knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where({name: 'Point of view gun'})
    .first()
    .toQuery()

//remove comment '//' syntax (if present below) to see console.log output
//console.log("console.log(qry) //=> ", qry, '\n')


/* ----------------------------------------------------------------------------------- */
//p. 18 - 19
//removed //const searchTerm = 'holo'

//to search products that contain a provided search term in its name (case-insensitive)
function searchByProduceName(searchTerm) {
    knexInstance
   .select('product_id', 'name', 'price', 'category')
   .from('amazong_products')
   .where('name', 'ILIKE', `%${searchTerm}%`)
   .then(result => 
        console.log("searchByProduceName(searchTerm) result(s):\n", result, '\n')
    )
}

//remove comment '//' syntax (if present below) to see console.log output
//searchByProduceName('holo');


/* ----------------------------------------------------------------------------------- */
//p. 20

//using limit & offset to paginate the table products (p. 19)
function paginateProducts(page){
    const productsPerPage = 10
    const offset = productsPerPage * (page - 1)
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log("paginateProducts(page) result(s):\n", result, '\n')
        })
}

//remove comment '//' syntax (if present below) to see console.log output
//paginateProducts(2)


/* ----------------------------------------------------------------------------------- */
//p. 21

//filter products that have images
function getProductsWithImages() {
    knexInstance
        .select('product_id', 'name', 'price', 'category', 'image')
        .from('amazong_products')
        .whereNotNull('image')
        .then(result => {
            console.log("getProductsWithImages() result(s):\n", result, '\n')
        })
}

//remove comment '//' syntax (if present below) to see console.log output
//getProductsWithImages()


/* ----------------------------------------------------------------------------------- */
//p. 22

//find the most popular videos
function mostPopularVideosForDays(days) {
    knexInstance
      .select('video_name', 'region')
      .count('date_viewed AS views')
      .where(
        'date_viewed',
        '>',
        //we can use raw method to pass in "raw" SQL as a string (p. 23)
        //we use ?? to tell knex that this is the position in the raw SQL that will contain user input (days)
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days) 
      )
      .from('whopipe_video_views')
      .groupBy('video_name', 'region')
      .orderBy([
        { column: 'region', order: 'ASC' },
        { column: 'views', order: 'DESC' },
      ])
      .then(result => {
        console.log("mostPopularVideosForDays(days) result(s):\n", result, '\n')
    })
  }
  
  //remove comment '//' syntax (if present below) to see console.log output
  mostPopularVideosForDays(30)







/* ----------------------------------------------------------------------------------- */
/* Notes

toQuery() gets the SQL query; returns a string of the query at its current state (p. 12-13)

knex methods (p. 13):
https://knexjs.org/#Builder (see sidebar)

*/

