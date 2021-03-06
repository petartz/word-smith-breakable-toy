const Model = require("./Model.js")

class Tag extends Model{
  static get tableName(){
    return("tags")
  }

  static get relationMappings() {
    const Word = require("./Word.js")
    const Categorization = require("./Categorization.js")
    const User = require("./User.js")

    return {
      words: {
        relation: Model.ManyToManyRelation,
        modelClass: Word,
        join: {
          from: "tags.id",
          through:{
            from: "categorizations.tagId",
            to: "categorizations.wordId"
          },
          to: "words.id"
        }
      },
      categorizations: {
        relation: Model.HasManyRelation,
        modelClass: Categorization,
        join: {
          from: "tags.id",
          to: "categorizations.tagId"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modeClass: User,
        join: {
          from: "tags.id",
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
        name: { type:"string" }
      }
    }
  }

}

module.exports = Tag