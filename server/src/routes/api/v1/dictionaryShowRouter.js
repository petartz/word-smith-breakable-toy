import express from "express";
import Word from "../../../models/Word.js"
import Tag from "../../../models/Tag.js"
import WordSerializer from "../../../serializers/WordSerializer.js";
import dictionaryFilterRouter from "./dictionaryFilterRouter.js"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import dictionaryEditRouter from "./dictionaryEditRouter.js"
import Dictionary from "../../../models/Dictionary.js";
import tagsRouter from "./tagsRouter.js"

const dictionaryShowRouter = new express.Router()

dictionaryShowRouter.use("/filter", dictionaryFilterRouter)
dictionaryShowRouter.use("/edit", dictionaryEditRouter)
dictionaryShowRouter.use("/tags", tagsRouter)

dictionaryShowRouter.get("/", async (req,res) =>{
  try{
    const words = await Word.query().orderBy("id", "desc").withGraphFetched("tags")

    const serializedWords = WordSerializer.getSummary(words)
    return res.status(200).json({ words:serializedWords })
  } catch (error) {
    res.status(500).json({ errors:error })
  }
})

dictionaryShowRouter.delete("/delete", async (req,res) => {
  const { wordId } = req.body

  try {
    const wordToDelete = await Word.query().findById(wordId)
    await wordToDelete.$relatedQuery("categorizations").delete()
    await Dictionary.query().where({wordId:wordToDelete.id}).delete()

    await Word.query().deleteById(wordId)
    return res.status(201).json({ message: "Successful delete!" })
  } catch (error) {
    return res.status(500).json({ errors:error })
  }
})

dictionaryShowRouter.post('/', async (req,res) =>{
  const formInput = cleanUserInput(req.body)

  for (let i=0; i<formInput.tags.length; i++){
    formInput.tags[i] = (await Tag.query().where({name:`${formInput.tags[i]}`}))[0]
  }

  try {
    const newWord = await Word.query().insertGraphAndFetch(formInput, { relate: true })
    return res.status(200).json({ word:newWord })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error });
  }
})

export default dictionaryShowRouter
