import Tag from "../../../models/Tag.js"

class TagSeeder{
  static async seed(){

    const tagData = [
      {id:1, name:"past"},
      {id:2, name:"change"},
      {id:3, name:"future"},
      {id:4, name:"self"},
      {id:5, name:"people"},
      {id:6, name:"happy"},
      {id:7, name:"sad"},
      {id:8, name:"angry"},
      {id:9, name:"anxious"},
      {id:10, name:"exhausted"},
      {id:11, name:"desire"},
      {id:12, name:"disconnected"},
      {id:13, name:"connected"},
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