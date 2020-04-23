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

console.log('knex and driver installed correctly \n');


/* ----------------------------------------------------------------------------------- */

//removed //p. 11-12
//removed //const q1 = knexInstance('amazong_products').select('*').toQuery() //=> q1: select * from "amazong_products"
//removed //const q2 = knexInstance.from('amazong_products').select('*').toQuery() //=> q2: select * from "amazong_products"
//removed //console.log('q1:', q1)
//removed //console.log('q2:', q2)


/* ----------------------------------------------------------------------------------- */
//p. 13-15

/*
const qry = knexInstance
   .select('product_id', 'name', 'price', 'category')
   .from('amazong_products')
   .where({name: 'Point of view gun'})
   .first()
   .then(result => {
       console.log(result)
   })
*/

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

function mostPopularVideosForDays(days) {
    knexInstance
      .select('video_name', 'region')
      .count('date_viewed AS views')
      .where(
        'date_viewed',
        '>',
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