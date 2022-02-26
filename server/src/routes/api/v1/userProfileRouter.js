import express from "express";
import Word from "../../../models/Word.js"
import Tag from "../../../models/Tag.js"
import WordSerializer from "../../../serializers/WordSerializer.js";

const userProfileRouter = new express.Router()



userProfileRouter.get("/:id", async (req,res) =>{
  try{
    const id = req.params.id
    const words = await Word.query().where({userId:id}).orderBy("id", "desc")
    const serializedWords = WordSerializer.getSummary(words)
    return res.status(200).json({ words:serializedWords })
  } catch (error) {
    res.status(500).json({ errors:error })
  }
})

export default userProfileRouter