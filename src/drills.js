//17.13 Assignment drills

require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})
/* ----------------------------------------------------------------------------------- */

console.log('knex and driver installed correctly \n')


/* ----------------------------------------------------------------------------------- */
//1. Get all items that contain text.
function textItems(searchTerm){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log('items that contain search term:\n', result, '\n')
        })
}

textItems('Fish');


/* ----------------------------------------------------------------------------------- */
//2. Get all items paginated
function paginate(pageNumber){
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(6)
        .offset(6 * (pageNumber - 1))
        .then(result => {
            console.log('paginated items:\n', result, '\n')
        })
}

paginate(2);


/* ----------------------------------------------------------------------------------- */
//3. Get all items added after date
function itemsAddedAfterDate(daysAgo){
    knexInstance
        .select('*')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .from('shopping_list')
        .then(result => {
            console.log('items added after date:\n', result, '\n')
        })    
}

itemsAddedAfterDate(5);


/* ----------------------------------------------------------------------------------- */
//4. Get the total cost for each category
function getTotalCost(){
    knexInstance
        .select('category')
        .sum('price')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log('total cost for each category:\n', result, '\n')
        })
}

getTotalCost();


