import express from "express"
import HomeFolder from "../../../models/HomeFolder.js"
import HomeDictSerializer from "../../../serializers/HomeDictSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const homeDictionaryRouter = new express.Router()

homeDictionaryRouter.get("/", async (req,res) => {
  try{
    const folders = await HomeFolder.query()
    const serializedFolders = HomeDictSerializer.getSummary(folders)

    console.log(serializedFolders)
    return res.status(200).json({ homeFolders:serializedFolders })

  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

homeDictionaryRouter.post("/", async (req, res) => {
  const newFolder = cleanUserInput(req.body)
  try{
    console.log(newFolder)
    await HomeFolder.query().insert(newFolder)

    return res.status(200).json({ folder: newFolder })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default homeDictionaryRouter