import express from "express"
import WordSerializer from "../../../serializers/WordSerializer.js"
import Word from "../../../models/Word.js"
import Tag from "../../../models/Tag.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"
import Categorization from "../../../models/Categorization.js"


const homeEditRouter = new express.Router( {mergeParams:true} )

homeEditRouter.post("/", async (req, res) => {
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

export default homeEditRouter