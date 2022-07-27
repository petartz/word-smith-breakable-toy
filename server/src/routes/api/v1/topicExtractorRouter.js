import express from "express"
import got from "got"
// import { ArgumentParser } from "argparse"
import Api from "rosette-api"

const topicExtractorRouter = new express.Router()

topicExtractorRouter.post('/', async (req, res) => {
  console.log(req.body)
  // const headers = {
  //   "X-RosetteAPI-Key": "fbd6cfb2b68ffe6a87ac9645e48a0216",
  //   "Content-Type": "application/json",
  //   "Accept" : "application/json" ,
  //   "Cache-Control": "no-cache"
  // }
  // const response = await got.post("https://api.rosette.com/rest/v1/topics", { json: req.body }, {headers: headers})


  var api = new Api("fbd6cfb2b68ffe6a87ac9645e48a0216", "https://api.rosette.com/rest/v1/");
  var endpoint = "topics";

  api.parameters.content = req.body.content;

  api.rosette(endpoint, function(err, response){
      if(err){
        return res.status(500).json({ errors:err })
      } else {
        return res.status(200).json({ topics: response })
      }
  });

})

export default topicExtractorRouter