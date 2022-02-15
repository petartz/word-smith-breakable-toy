import fs from 'fs'

const wordsPathShort = "/Users/Pete/challenges/word-smith-breakable-toy/server/DictionaryOfSorrowsAPISHORT.json"
const wordsPathLong = "/Users/Pete/challenges/word-smith-breakable-toy/server/DictionaryOfSorrowsAPI.json"

class WordObjects {
    static parseObjects(){
        // const wordObjects = JSON.parse(fs.readFileSync(wordsPathLong)).words
        // return wordObjects
        const wordObjects = JSON.parse(fs.readFileSync(wordsPathShort)).words
        return wordObjects
    }

  }

export default WordObjects