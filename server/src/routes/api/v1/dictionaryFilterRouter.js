import express from "express"
import WordSerializer from "../../../serializers/WordSerializer.js"
import Tag from "../../../models/Tag.js"

const dictionaryFilterRouter = new express.Router()

dictionaryFilterRouter.post("/", async (req,res)=>{
  try{
    const tags = req.body.tags
    const restriction = req.body.restriction

    const serializedWords = await WordSerializer.getDetails(tags, restriction)

    return res.status(200).json({ words:serializedWords })
  } catch(error) {
    return res.status(500).json({ errors:error })
  }

})

export default dictionaryFilterRouter