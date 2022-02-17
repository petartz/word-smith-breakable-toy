import Categorization from "../../../models/Categorization.js"
import Word from "../../../models/Word.js"
import WordObjects from "../../../jsonParser/jsonParse.js"

class CategorizationSeeder{
  static async seed(){

    const wordData = WordObjects.parseObjectsTagged()

    for (const singleWord of wordData){
        for (const tag of singleWord.tags){
          let current = await Word.query().findById(singleWord.id)
          await current.$relatedQuery("tags").relate({id:tag})
        }
    }
  }

}

export default CategorizationSeeder