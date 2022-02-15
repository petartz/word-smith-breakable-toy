import WordObjects from "../../../jsonParser/jsonParse.js";
import Word from "../../../models/Word.js"

class WordSeeder{
  static async seed(){

    const wordData = WordObjects.parseObjects()

    for (const singleWord of wordData){
      const currentWord = await Word.query().findOne(singleWord)
      if(!currentWord){
          await Word.query().insert(singleWord)
      }
    }
  }

}

export default WordSeeder