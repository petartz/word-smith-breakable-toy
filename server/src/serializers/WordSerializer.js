import Word from "../models/Word.js"
import Tag from "../models/Tag.js"
import Helper from "./helperFunctions.js"

class WordSerializer{
  static getSummary(words){
    const allowedAttributes = ["id", "title", "definition", "speech"]

    const serializedWords = words.map(word => {
      let serializedWord = {}
      for(const attribute of allowedAttributes){
        serializedWord[attribute] = word[attribute]
      }
      return serializedWord
    })
    return serializedWords
  }

  static async getDetails(tags, restriction){
    let wordList = []

    // const baseQuery = Word.query()
    // let dataTags = await Tag.query().whereIn("name", ["happy", "sad"]).withGraphFetched("words")
// ^^ tags with their associated words

    for(const tag of tags){
      let retrievedTag = await Tag.query().findOne({name: tag})
      let associatedWords = await retrievedTag.$relatedQuery("words")
      wordList = [...wordList, ...associatedWords]
    }

    let strictOverlapList = []

    if(tags.length === 1){
      // use wordList as is (can also implement Accumulator option)
    } else {
      if(restriction){
        wordList.forEach(word => {
          if ((wordList.filter(otherWord => otherWord.id == word.id)).length == tags.length
          && Helper.firstIndexOf(word, strictOverlapList) == -1) {
            strictOverlapList.push(word)
          }
        })
        wordList = strictOverlapList
      } else {
        wordList = wordList.filter(word => {
          return Helper.firstIndexOf(word, wordList) !== Helper.lastIndexOf(word, wordList)
        })
        wordList = [...new Map(wordList.map((object) => [object["title"], object])).values()];
      }
    }

    const allowedAttributes = ["id", "title", "definition", "speech"]
    const serializedWords = wordList.map(word => {
      let serializedWord = {}
      for(const attribute of allowedAttributes){
        serializedWord[attribute] = word[attribute]
      }
      return serializedWord
    })
    return serializedWords
  }



}

export default WordSerializer