import fs from 'fs'

const wordsPathTagged = "../server/DictionaryOfSorrowsAPITagged.json"
const wordsPathPure = "../server/DictionaryOfSorrowsAPI.json"

class WordObjects {
    static parseObjectsTagged(){
        const taggedObjects = JSON.parse(fs.readFileSync(wordsPathTagged)).words
        return taggedObjects
      }

      static parseObjects(){
        const wordObjects = JSON.parse(fs.readFileSync(wordsPathPure)).words
        wordObjects.forEach(word =>{
          word.userId = 1
        })
      return wordObjects
  }

  }

export default WordObjects