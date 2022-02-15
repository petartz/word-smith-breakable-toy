const Model = require("./Model.js")

class Categorization extends Model{
  static get tableName(){
    return("categorizations")
  }

  static get relationMappings() {
    const Tag = require("./Tag.js")
    const Word = require("./Word.js")

    return {
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tag,
        join: {
          from: "categorizations.tagId",
          to: "tags.id"
        }
      },
      word: {
        relation: Model.BelongsToOneRelation,
        modelClass: Word,
        join: {
          from: "categorizations.wordId",
          to: "words.id"
        }
      }
    }
  }
}

module.exports = Categorization