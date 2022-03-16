import express from "express";
import Tag from "../../../models/Tag.js"

const tagsRouter = new express.Router()

tagsRouter.get("/", async (req,res) =>{
  try{
    const tags = await Tag.query()
    return res.status(200).json({ tags:tags })
  } catch (error) {
    res.status(500).json({ errors:error })
  }
})

export default tagsRouter