import Tag from "../../../models/Tag.js"

class TagSeeder{
  static async seed(){

    const tagData = [
      {name:"past", userId:1},
      {name:"change", userId:1},
      {name:"future", userId:1},
      {name:"self", userId:1},
      {name:"people", userId:1},
      {name:"happy", userId:1},
      {name:"sad", userId:1},
      {name:"angry", userId:1},
      {name:"anxious", userId:1},
      {name:"exhausted", userId:1},
      {name:"desire", userId:1},
      {name:"disconnected", userId:1},
      {name:"connected", userId:1},
    ]
    for (const singleTag of tagData){
      const currentTag = await Tag.query().findOne(singleTag)
      if(!currentTag){
        await Tag.query().insert(singleTag)
      }
    }
  }

}

export default TagSeeder