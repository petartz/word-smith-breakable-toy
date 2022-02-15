import React, { useEffect, useState } from "react";
import WordTile from "./WordTile";

const HomePage = () => {
  const [words, setWords] = useState([])

  const fetchWordData = async () => {
    try{
      const response = await fetch("/api/v1/home")
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setWords(body.words)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchWordData()
  }, [])

  const wordTiles = words.map(word => {
    return <WordTile
    key= {word.id}
    word={word}/>
  })

  return(
    <div>
      {wordTiles}
    </div>
  )
}

export default HomePage