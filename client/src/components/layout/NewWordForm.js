import React, { useState } from "react"

const NewWordForm = props => {
  const [newWord, setNewWord] = useState({
    title: "",
    definition: "",
    speech: "",
    tags: []
  })
  const [clickedBoxes, setClickedBoxes] = useState([])


  const handleClick = (event) => {
    if (!(clickedBoxes.includes(event.currentTarget.name))){
      setClickedBoxes([...clickedBoxes, event.currentTarget.name])
    } else {
      let newBoxes = clickedBoxes.filter(attribute => attribute != event.currentTarget.name)
      setClickedBoxes(newBoxes)
    }
  }

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
    newWord.tags = clickedBoxes
    const success = await props.addNewWord(newWord)
    if(success){
      clearForm()
    }
  }

  return(
    <div className="add-word-form">
      <h2>Add New Word</h2>
      <form onSubmit={handleSubmit}>
        <div className="filters">
          <p>Tag your word</p>
          <div className="temporal">
            <ul>
              <input htmlFor="past" name="past" type="checkbox" onClick={handleClick} />
              <label>Past</label>
              <input htmlFor="change" name="change" type="checkbox" onClick={handleClick} />
              <label>Change</label>
              <input htmlFor="future" name="future" type="checkbox" onClick={handleClick} />
              <label>Future</label>
            </ul>
          </div>
          <div className="interpersonal">
            <ul>
              <input htmlFor="self" name="self" type="checkbox" onClick={handleClick} />
              <label>Self</label>
              <input htmlFor="people" name="people" type="checkbox" onClick={handleClick} />
              <label>People</label>
            </ul>
          </div>
          <div className="emotion">
            <ul>
              <input htmlFor="happy" name="happy" type="checkbox" onClick={handleClick} />
              <label>Happy</label>
              <input htmlFor="sad" name="sad" type="checkbox" onClick={handleClick} />
              <label>Sad</label>
              <input htmlFor="angry" name="angry" type="checkbox" onClick={handleClick} />
              <label>Angry</label>
              <input htmlFor="anxious" name="anxious" type="checkbox" onClick={handleClick} />
              <label>Anxious</label>
              <input htmlFor="exhausted" name="exhausted" type="checkbox" onClick={handleClick} />
              <label>Exhausted</label>
              <input htmlFor="desire" name="desire" type="checkbox" onClick={handleClick} />
              <label>Desire</label>
            </ul>
          </div>
          <div className="">
            <ul>
              <input htmlFor="disconnected" name="disconnected" type="checkbox" onClick={handleClick} />
              <label>Disconnected</label>
              <input htmlFor="connected" name="connected" type="checkbox" onClick={handleClick} />
              <label>Connected</label>
            </ul>
          </div>
        </div>
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={newWord.title}
            placeholder="Title"
            />
        </label>

        <label htmlFor="definition">
          <input
            type="text"
            id="definition"
            name="definition"
            onChange={handleInputChange}
            value={newWord.definition}
            placeholder="Definition"
            />
        </label>

        <label htmlFor="speech">
          <select
            id="speech"
            name="speech"
            onChange={handleInputChange}
            value={newWord.speech}>
              <option value="">Designate the part of speech</option>
              <option value="noun">Noun</option>
              <option value="adjective">Adjective</option>
              <option value="verb">Verb</option>
          </select>
        </label>

        <input className="add-submit" type="submit"/>
      </form>
    </div>
  )
}

export default NewWordForm