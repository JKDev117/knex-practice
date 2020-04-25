//17.14 Assignment

const ShoppingListService = {

    //get shopping list items
    getAllShoppingListItems(knex){
        return knex.select('*').from('shopping_list')
    },
    //insert a shopping list item
    insertShoppingListItem(knex, newShoppingItem){
        return knex
            .insert(newShoppingItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id){
        return knex.from('shopping_list').select('*').where('id', id).first()
    },
    //update a shopping list item
    updateShoppingListItem(knex, idOfShoppingItemToUpdate, newShoppingItemData){
        return knex('shopping_list')
            .where({id: idOfShoppingItemToUpdate})
            .update(newShoppingItemData)
    },
    //delete a shopping list item
    deleteShoppingListItem(knex, idOfShoppingItemToDelete){
        return knex('shopping_list')
            .where({id: idOfShoppingItemToDelete})
            .delete()
    }

}


module.exports = ShoppingListService


