import express from "express";
import Word from "../../../models/Word.js"
import WordSerializer from "../../../serializers/WordSerializer.js";
import homeFilterRouter from "./homeFilterRouter.js"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";

const homePageRouter = new express.Router()

homePageRouter.use("/filter", homeFilterRouter)

homePageRouter.get("/", async (req,res) =>{
  try{
    const words = await Word.query().orderBy("id")
    const serializedWords = WordSerializer.getSummary(words)

    return res.status(200).json({ words:serializedWords })
  } catch (error) {
    res.status(500).json({ errors:error })
  }

})

homePageRouter.post('/', async (req,res) =>{
  const formInput = cleanUserInput(req.body)

  try {
    const newWord = await Word.query().insertAndFetch(formInput)
    return res.status(200).json({ word:newWord })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error });
  }
})

export default homePageRouter