/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");

const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get relationMappings() {
    const Tag = require("./Tag.js")
    const Categorization = require("./Categorization.js")
    const Word = require("./Word.js")
    const Folder = require("./Folder.js");

    return {
      words: {
        relation: Model.HasManyRelation,
        modelClass: Word,
        join: {
          from: "users.id",
          to: "words.id"
        }
      },
      tags: {
        relation: Model.HasManyRelation,
        modelClass: Tag,
        join: {
          from: "users.id",
          to: "tags.id"
        }
      },
      folders: {
        relation: Model.HasManyRelation,
        modelClass: Folder,
        join: {
          from: "users.id",
          to: "folders.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string", format: "email" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
