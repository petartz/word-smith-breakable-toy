import express from "express";
import Word from "../../../models/Word.js"
import Tag from "../../../models/Tag.js"
import Dictionary from "../../../models/Dictionary.js"
import WordSerializer from "../../../serializers/WordSerializer.js";
import userDictionaryRouter from "./userDictionaryRouter.js"
import cleanUserInput from "../../../services/cleanUserInput.js"


const userProfileRouter = new express.Router()


userProfileRouter.use("/:id/dictionaries", userDictionaryRouter)

userProfileRouter.get("/:id", async (req,res) =>{
  try{
    const id = req.params.id
    const words = await Word.query().where({ userId:id }).withGraphFetched("tags").orderBy("id", "desc")
    const serializedWords = WordSerializer.getSummary(words)
    return res.status(200).json({ words:serializedWords })
  } catch (error) {
    res.status(500).json({ errors:error })
  }
})

userProfileRouter.delete("/:id", async (req,res) => {
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

userProfileRouter.post("/:id", async (req, res) => {
  const cleanInput = cleanUserInput(req.body)
  const { id, title, definition, speech, tags, userId } = cleanInput

  for (let i=0; i<tags.length; i++){
    tags[i] = (await Tag.query().where({name:`${tags[i]}`}))[0]
  }

  try{
    const editedWord = { id, title, definition, speech, userId, tags }
    await Word.query().upsertGraph(editedWord, { unrelate:true, update:true, relate: true })

    // console.log(editedWord)
    return res.status(201).json({ word: editedWord })
  } catch(error) {
    if (error instanceof ValidationError){
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors:error })
  }
})

export default userProfileRouter