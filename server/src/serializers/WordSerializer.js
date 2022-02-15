
class WordSerializer{
  static getSummary(word){
    const allowedAttributes = ["id", "title", "definition", "speech"]

    let serializedWord = {}
    for(const attribute of allowedAttributes){
      serializedWord[attribute] = word[attribute]
    }
    return serializedWord
  }

}

export default WordSerializer