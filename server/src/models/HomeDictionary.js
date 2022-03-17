const Model = require("./Model.js")

class HomeDictionary extends Model{
  static get tableName(){
    return("homeDictionaries")
  }

  static get relationMappings() {
    const HomeFolder = require("./HomeFolder.js")
    const User = require("./User.js")
    const Word = require("./Word.js")

    return {
      homeFolder: {
        relation: Model.BelongsToOneRelation,
        modelClass: HomeFolder,
        join: {
          from: "homeDictionaries.homeFolderId",
          to: "homeFolders.id"
        }
      },
      word: {
        relation: Model.BelongsToOneRelation,
        modelClass: Word,
        join: {
          from: "homeDictionaries.wordId",
          to: "words.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "homeDictionaries.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = HomeDictionary