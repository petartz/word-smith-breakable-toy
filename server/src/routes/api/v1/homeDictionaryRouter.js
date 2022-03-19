import express from "express"
import HomeFolder from "../../../models/HomeFolder.js"
import HomeDictSerializer from "../../../serializers/HomeDictSerializer.js"

const homeDictionaryRouter = new express.Router()

homeDictionaryRouter.get("/", async (req,res) => {
  // console.log("yello")
  try{
    const folders = await HomeFolder.query()
    const serializedFolders = HomeDictSerializer.getSummary(folders)

    console.log(serializedFolders)
    return res.status(200).json({ homeFolders:serializedFolders })

  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default homeDictionaryRouter