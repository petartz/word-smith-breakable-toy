import React, { useState } from "react"

const NewWordForm = props => {
  const [newWord, setNewWord] = useState({
    title: "",
    definition: "",
    speech: "",
  })

  const handleInputChange = event => {
    setNewWord({
      ...newWord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setNewWord({
      title: "",
      definition: "",
      speech: ""
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await props.addNewWord(newWord)
    if(success){
      clearForm()
    }
  }

  return(
    <div>
      <h1>Add New Word!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={newWord.title}/>
        </label>

        <label htmlFor="definition">
          Definition:
          <input
            type="text"
            id="definition"
            name="definition"
            onChange={handleInputChange}
            value={newWord.definition}/>
        </label>

        <label htmlFor="speech">
          Part of speech:
          <select
            id="speech"
            name="speech"
            onChange={handleInputChange}
            value={newWord.speech}>
              <option value="">Please choose a score!</option>
              <option value="noun">Noun</option>
              <option value="adjective">Adjective</option>
              <option value="verb">Verb</option>
          </select>
        </label>

        <input className="submit-button" type="submit"/>
      </form>
    </div>
  )
}

export default NewWordForm