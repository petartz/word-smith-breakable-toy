const Model = require("./Model.js")

class HomeFolder extends Model{
  static get tableName(){
    return("homeFolders")
  }

  static get relationMappings() {
    const Word = require("./Word.js")
    const Categorization = require("./Categorization.js")
    const User = require("./User.js")

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "homeFolders.id",
          through:{
            from: "homeDictionaries.homeFolderId",
            to: "homeDictionaries.userId"
          },
          to: "users.id"
        }
      },
      words:{
        relation: Model.ManyToManyRelation,
        modelClass: Word,
        join: {
          from: "homeFolders.id",
          through: {
            from: "homeDictionaries.homeFolderId",
            to: "homeDictionaries.wordId"
          },
          to: "words.id"
        }
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "homeFolders.id",
          to: "users.id"
        }
      }

    }
  }

  static get jsonSchema(){
    return {
      type:"object",
      required:["name", "description"],
      properties:{
        name: { type:"string" },
        description: { type: "string"}

      }
    }
  }

}

module.exports = HomeFolder