import express from "express"
import Folder from "../../../models/Folder.js"

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
  console.log(req.params.dictName)
  try{
    const userId = req.params.id
    const dictName = req.params.dictName
    const currentFolder = await Folder.query().where({ userId:userId }).where({ name: dictName })
    return res.status(200).json({ folder:currentFolder })
  } catch {

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