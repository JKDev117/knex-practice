//17.14 Building services
//What is ArticlesService? (read pgs. 3-5)

//making a service object first involves making an object that we'll export
const ArticlesService = {
    //pg. 20
    getAllArticles(knex){
        return knex.select('*').from('blogful_articles')
    },
    //adding articles (p. 26)
    insertArticle(knex, newArticle){
        return knex
            .insert(newArticle)
            .into('blogful_articles')
            //returning() allows us to specify which columns we want (p. 26)
            .returning('*')
            //to pull the item out of the returned array (p. 27)
            .then(rows => {
                return rows[0]
            })
    },
    //get a specific article (p. 27)
    getById(knex, id){
        return knex.from('blogful_articles').select('*').where('id', id).first()
    },
    //delete an article (p. 29)
    deleteArticle(knex, id){
        return knex('blogful_articles')
            .where({id})
            .delete()
    },
    //update article (p. 30)
    updateArticle(knex, id, newArticleFields){
        return knex('blogful_articles')
            .where({id})
            .update(newArticleFields)
    }
    


}

module.exports = ArticlesService




