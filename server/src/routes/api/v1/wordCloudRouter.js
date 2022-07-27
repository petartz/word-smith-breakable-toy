import express from "express"
import got from 'got'

const wordCloudRouter = new express.Router()

wordCloudRouter.post('/', async (req, res) => {
  console.log(req.body)
  const response = await got.post('https://quickchart.io/wordcloud', { json: req.body })

  return res.status(200).json({ svg: response.body })
})

export default wordCloudRouter