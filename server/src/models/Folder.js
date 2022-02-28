const Model = require("./Model.js")

class Folder extends Model{
  static get tableName(){
    return("folders")
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
          from: "folders.id",
          through:{
            from: "dictionaries.folderId",
            to: "dictionaries.userId"
          },
          to: "users.id"
        }
      },
      words:{
        relation: Model.ManyToManyRelation,
        modelClass: Word,
        join: {
          from: "folders.id",
          through: {
            from: "dictionaries.folderId",
            to: "dictionaries.wordId"
          },
          to: "words.id"
        }
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "folders.id",
          to: "users.id"
        }
      }

    }
  }

  static get jsonSchema(){
    return {
      type:"object",
      required:["name"],
      properties:{
        name: { type:"string" },

      }
    }
  }

}

module.exports = Folder