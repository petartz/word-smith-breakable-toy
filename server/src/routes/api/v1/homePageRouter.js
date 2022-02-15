import express from "express";
import Word from "../../../models/Word.js"
import WordSerializer from "../../../serializers/WordSerializer.js";

const homePageRouter = new express.Router()

homePageRouter.get("/", async (req,res) =>{
  try{
    const words = await Word.query().orderBy("id")
    const serializedWords = words.map(word => {
      return WordSerializer.getSummary(word)
    })
    return res.status(200).json({ words:serializedWords })
  } catch (error) {
    res.status(500).json({ errors:error })
  }

})

export default homePageRouter