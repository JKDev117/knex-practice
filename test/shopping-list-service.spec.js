//17.14 Assignment

const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex') //knex is a tool to help write SQL queries

describe('Shopping List service object', function() {

    //declare a variable called db
    let db  

    //test data
    let testShoppingListItems = [
        {
            id: 1,
            name: "Hungry-Man Boneless Fried Chicken",
            price: '2.79',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: true,
            category: "Main" 
        },
        {
            id: 2,
            name: "Gold Fish Cheddar Baked Snack Crackers",
            price: '1.79',
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            checked: true,
            category: "Snack" 
        },
        {
            id: 3,
            name: "Totino's Hamburger Party Pizza",
            price: '1.34',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            checked: true,
            category: "Lunch" 
        },
    ]

    //make & store the knex instance in the variable called db
    //before the tests run
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    //remove all the rows before we insert new test data
    before(() => db('shopping_list').truncate());

    //remove all of the data after each test
    afterEach(() => db('shopping_list').truncate());

    //to disconnect from the database at the end of all tests
    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        
        //before each individual test add data to the table
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testShoppingListItems)
        })

        //test that getAllShoppingListItems gets data from the table
        it(`getAllShoppingListItems() resolves all shopping list items from 'shopping_list' table`, () => {
            return ShoppingListService.getAllShoppingListItems(db)
                .then(actual => {
                    expect(actual).to.eql(testShoppingListItems)
                })
        })
      
        //test to ensure that the specific shopping item has been updated
        it(`updateShoppingListItem() updates a shopping list item from the 'shopping_list' table`, () => {
            const idOfShoppingItemToUpdate = 3
            const newShoppingItemData = {
                name: "Updated Name",
                price: '9.99',
                date_added: new Date(),
                checked: false,
                category: "Main"
            }
            return ShoppingListService.updateShoppingListItem(db, idOfShoppingItemToUpdate, newShoppingItemData)
                .then(() => ShoppingListService.getById(db, idOfShoppingItemToUpdate))
                .then(item => {
                    expect(item).to.eql({
                        id: idOfShoppingItemToUpdate,
                        ...newShoppingItemData
                    })
                })
        })

        //test to ensure item is removed from shopping item list
        it(`deleteShoppingListItem() removes a shopping item by id from 'shopping_list' table`, () => {
            const idOfShoppingItemToDelete = 3
            return ShoppingListService.deleteShoppingListItem(db, idOfShoppingItemToDelete)
                .then(() => ShoppingListService.getAllShoppingListItems(db))
                .then(allItems => {
                    const expected = testShoppingListItems.filter(item => item.id !== idOfShoppingItemToDelete)
                    expect(allItems).to.eql(expected)
                }) 
        })
    
    }) //end context

    
    context(`Given 'shopping_list' has NO data`, () => {
        
        it(`getAllShoppingListItems() resolves an empty array`, () => {
            return ShoppingListService.getAllShoppingListItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })

        })

        it(`insertShoppingListItem() inserts a shopping list item and resolves the new item with an 'id'`, () => {
            const newShoppingItem = {
                name: "Private Selection Center Cut Bacon",
                price: '3.99',
                date_added: new Date('2020-01-01T00:00:00.00Z'),
                checked: true,
                category: "Main"
            }
            return ShoppingListService.insertShoppingListItem(db, newShoppingItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newShoppingItem.name,
                        price: newShoppingItem.price,
                        date_added: newShoppingItem.date_added,
                        checked: newShoppingItem.checked,
                        category: newShoppingItem.category
                    })    
                })
        })


    }) //end context   
    


})