import WordObjects from "../../../jsonParser/jsonParse.js";
import HomeDictionary from "../../../models/HomeDictionary.js"

class HomeDictionarySeeder{
  static async seed(){

    const wordData = WordObjects.parseObjectsTagged()

    for (const singleWord of wordData){
      let dictEntry = {
        wordId:singleWord.id,
        homeFolderId:1,
        userId:1
      }
      await HomeDictionary.query().insert(dictEntry)
    }
  }

}

export default HomeDictionarySeeder