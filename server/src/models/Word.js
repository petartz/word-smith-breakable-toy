const Model = require("./Model.js")

class Word extends Model{
  static get tableName(){
    return("words")
  }

  static get relationMappings(){
    const Tag = require("./Tag.js")
    const Categorization = require("./Categorization.js")

    return{
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        join: {
          from: "words.id",
          through:{
            from: "categorizations.wordId",
            to: "categorizations.tagId"
          },
          to: "tags.id"
        }
      },
      categorizations: {
        relation: Model.HasManyRelation,
        modelClass: Categorization,
        join: {
          from: "words.id",
          to: "categorizations.wordId"
        }
      }
    }
  }

  static get jsonSchema(){
    return {
      type:"object",
      required:["title", "definition", "speech"],
      properties:{
        title: { type: "string" },
        nonLatinTitle: { type: "string" },
        author: { type: "string" },
        authorPicture: { type: ["string", null] },
        definition: { type: "string" },
        speech: { type: "string" },
        video: { type: ["string", null] },
        entry: { type: "integer" },
        hasQuotes: { type: ["integer", null] },
        tags: { type: "array" }
      }
    }
  }

}

module.exports = Word