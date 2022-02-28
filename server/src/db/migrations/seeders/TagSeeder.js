import Tag from "../../../models/Tag.js"

class TagSeeder{
  static async seed(){

    const tagData = [
      {id:1, name:"past", userId:1},
      {id:2, name:"change", userId:1},
      {id:3, name:"future", userId:1},
      {id:4, name:"self", userId:1},
      {id:5, name:"people", userId:1},
      {id:6, name:"happy", userId:1},
      {id:7, name:"sad", userId:1},
      {id:8, name:"angry", userId:1},
      {id:9, name:"anxious", userId:1},
      {id:10, name:"exhausted", userId:1},
      {id:11, name:"desire", userId:1},
      {id:12, name:"disconnected", userId:1},
      {id:13, name:"connected", userId:1},
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