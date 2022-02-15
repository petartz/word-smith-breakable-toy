import React from "react"

const WordTile = ({ word }) => {

  return(
    <div className="word-tile">
      <p>Word: {word.title}</p>
      <p>Definition: {word.definition}</p>
      <p>Part of Speech: {word.speech}</p>
    </div>
  )

}

export default WordTile