import React, { useState, useEffect } from "react"
import RosetteTile from "./Tiles/RosetteTile.js"
import RosetteTileConcept from "./Tiles/RosetteTileConcept.js"

const UserProfileTopicExtractor = props => {
  const [concepts, setConcepts] = useState([])
  const [keyPhrases, setKeyPhrases] = useState([])


  const topicExtractor = async () => {
    let content = ""
    props.words.forEach(word =>{
      content += ` ${(word.definition)}`
    })
    content = content.replace(/\s[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase()
    const sendBody = JSON.stringify({
      "content": content
    })

    try{
      const response = await fetch('/api/v1/topicExtractor', {
        method: 'POST',
        headers: new Headers ({
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          'X-RosetteAPI-Key': 'fbd6cfb2b68ffe6a87ac9645e48a0216'
        }),
        body: sendBody
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }else {
        const responseBody = await response.json()

        // console.log(responseBody.topics.concepts)
        // console.log(responseBody.topics.keyphrases)

        setConcepts(responseBody.topics.concepts)
        setKeyPhrases(responseBody.topics.keyphrases)

      }
    } catch(error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const keyPhraseTiles = keyPhrases.map(phrase => {
    return <RosetteTile
      key={phrase.phrase}
      phrase={phrase}/>
  })

  const conceptTiles = concepts.map(concept => {
    console.log(concept)
    return <RosetteTileConcept
      key={concept.phrase}
      concept={concept}/>
  })

  return (
    <div className="topic-extractor">
      <button className="wordCloud-button" onClick={topicExtractor}>Word Topics</button>
      <div className="word-tile">
        <div>
          Key Concepts: {conceptTiles}
        </div>

        {keyPhraseTiles}
      </div>
    </div>
  )

}

export default UserProfileTopicExtractor