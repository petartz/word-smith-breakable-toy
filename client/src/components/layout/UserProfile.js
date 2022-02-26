import React, { useState, useEffect } from "react"
import WordTile from "./WordTile.js"
import { deleteYourWord } from "./Requests.js"

const UserProfile = props => {
  const [userWords, setUserWords] = useState([])
  const [wordCloud, setWordCloud] = useState()

  const fetchWordData = async () => {
    try{
      const response = await fetch(`/api/v1/profile/${props.user.id}`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setUserWords(body.words)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }
  useEffect(() => {
    fetchWordData()
  }, [])

  const wordDelete = (wordId) => {
    deleteYourWord(wordId)

    const updatedWords = userWords.filter(word => word.id != wordId)
    setUserWords(updatedWords)
  }

  const wordCloudGen = async () => {
    // console.log(userWords)
    let userWordsText = ""
    userWords.forEach(word =>{
      userWordsText += ` ${(word.definition)}`
    })
    userWordsText = userWordsText.replace(/\s[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase()

    console.log(userWordsText)

    const sendBody = JSON.stringify({
      "text": userWordsText,
      "rotation": 1,
      "height": 400,
      'fontScale': 30,
      'backgroundColor': "#f7ede2",
      'font-family': "serif",
      'scale': 'linear',
      "colors": ["#e9c46a", "#e76f51", "#2a9d8f", "#f9844a"],
      "maxNumWords": 20,
      'removeStopwords': true,
      'minWordLength': 2,
    })
    try{
      const response = await fetch('/api/v1/wordCloud', {
        method: 'POST',
        headers: new Headers ({
          'Content-Type': 'application/json',
        }),
        body: sendBody
      })

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }else {
        const responseBody = await response.json()

        const parser = new DOMParser()
        let svg = parser.parseFromString(responseBody.svg, "text/html")
        console.log(svg.body.firstChild)
        svg.body.firstChild.setAttribute("width", "100%")

        if (document.querySelector("#word-cloud").children.length === 0){
          document.querySelector("#word-cloud").appendChild(svg.body.firstChild)
          document.querySelector("#word-cloud").classList.add("word-tile")
          document.querySelector("#word-cloud").classList.add("cloudies")
        } else {
          document.querySelector("#word-cloud").removeChild(document.querySelector("#word-cloud").firstChild)
          document.querySelector("#word-cloud").appendChild(svg.body.firstChild)
        }
      }
    } catch(error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const wordTiles = userWords.map(word => {
    return <WordTile
    key= {word.id}
    word={word}
    deleteYourWord={wordDelete}
    // editYourWord ={editYourWord}
    user={props.user}

    // currentWord={currentWord}
    // setCurrentWord={setCurrentWord}

    // editErrors={editErrors}
    />
  })



  return (
    <div>
      <button className="wordCloud-button link" onClick={wordCloudGen}>Generate Word Cloud</button>
      <div className="word-cloud" id="word-cloud">
      </div>
      <div>
        {wordTiles}
      </div>
    </div>
  )
}

export default UserProfile