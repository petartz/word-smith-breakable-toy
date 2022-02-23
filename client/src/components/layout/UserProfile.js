import React, { useState, useEffect } from "react"
import WordTile from "./WordTile.js"
import { deleteYourWord } from "./Requests.js"

const UserProfile = props => {
  const [userWords, setUserWords] = useState([])

  console.log(props.user)

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
      {wordTiles}
    </div>
  )
}

export default UserProfile