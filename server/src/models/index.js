// include all of your models here using CommonJS requires
const User = require("./User.js")
const Word = require("./Word.js")
const Tag = require("./Tag.js")
const Categorization = require("./Categorization.js")
const Folder = require("./Folder.js")
const HomeFolder = require("./HomeFolder.js")
const Dictionary = require("./Dictionary.js")
const HomeDictionary = require("./HomeDictionary.js")

module.exports = {User, Word, Tag, Categorization, Folder, Dictionary, HomeFolder, HomeDictionary};
