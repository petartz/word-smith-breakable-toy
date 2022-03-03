import express from "express"
import Folder from "../../../models/Folder.js"
import Dictionary from "../../../models/Dictionary.js"
import Word from "../../../models/Word.js"

const dictionaryRouter = new express.Router({ mergeParams:true })

dictionaryRouter.get("/", async (req,res)=>{
  try{
    const userId = req.params.id
    const folders = await Folder.query().where({ userId:userId })

    const newFolders = folders.map(folder => {
      return { value: folder.name, label:folder.name }

    })
    return res.status(200).json({ folders:newFolders })
  } catch(error) {
    return res.status(500).json({ errors:error })
  }
})

dictionaryRouter.get(`/:dictName`, async (req,res) => {
  try{
    const userId = req.params.id
    const dictName = req.params.dictName

    const folder = await Folder.query().where({ name:dictName })
    const dictList = await Dictionary.query().where({ userId:userId }).where({ folderId: folder[0].id })

    const wordIdArray = dictList.map(dictEntry => {
      return dictEntry.wordId
    })
    const wordList = await Word.query().whereIn("id", wordIdArray)

    return res.status(200).json({ words:wordList })
  } catch (error){
    return res.status(500).json({ errors:error })
  }
})

dictionaryRouter.post(`/:dictName`, async (req,res) => {
  const receivedBody = req.body
  console.log(req.body)
  try{
    const folder = await Folder.query().where({ name: receivedBody.dictName })
    const wordToAdd = { wordId: receivedBody.wordId, userId: receivedBody.userId, folderId: folder[0].id }

    const addToDict = await Dictionary.query().insert(wordToAdd)

    return res.status(200).json({ dictionary:addToDict })
  } catch (error){
    return res.status(500).json({ errors:error })
  }
})

dictionaryRouter.post("/", async (req,res)=>{
  console.log(req.body)
  try{
    await Folder.query().insert(req.body)

    return res.status(200).json({ success: true })
  } catch(error) {
    return res.status(500).json({ errors:error })
  }
})

export default dictionaryRouter