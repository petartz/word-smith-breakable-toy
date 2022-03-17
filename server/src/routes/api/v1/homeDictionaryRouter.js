import express from "express"
import HomeFolder from "../../../models/HomeFolder.js"

const homeDictionaryRouter = new express.Router()

homeDictionaryRouter.get("/", async (req,res) => {
  try{
    const folders = await HomeFolder.query()
    console.log(folders)

    return res.stats(200).json({ homeFolders:folders })

  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default homeDictionaryRouter