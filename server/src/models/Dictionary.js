const Model = require("./Model.js")

class Dictionary extends Model{
  static get tableName(){
    return("dictionaries")
  }

  static get relationMappings() {
    const User = require("./User.js")
    const Word = require("./Word.js")
    const Folder = require("./Folder.js")

    return {
      folder: {
        relation: Model.BelongsToOneRelation,
        modelClass: Folder,
        join: {
          from: "dictionaries.folderId",
          to: "folders.id"
        }
      },
      word: {
        relation: Model.BelongsToOneRelation,
        modelClass: Word,
        join: {
          from: "dictionaries.wordId",
          to: "words.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "dictionaries.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Dictionary