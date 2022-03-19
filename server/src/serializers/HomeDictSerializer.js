import Word from "../models/Word.js"
import Tag from "../models/Tag.js"

class HomeDictSerializer{
  static getSummary(dictionaries){
    const allowedAttributes = ["id", "name", "description", "image", "userId"]

    const serializedDicts = dictionaries.map(dict => {
      let serializedDict = {}
      for(const attribute of allowedAttributes){
        serializedDict[attribute] = dict[attribute]
      }
      return serializedDict
    })
    return serializedDicts
  }
}

export default HomeDictSerializer