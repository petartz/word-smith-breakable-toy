import React, { useState } from "react";
import ErrorList from "./ErrorList";

const EditForm = props => {
  const [editedWord, setEditedWord] = useState({
    id: props.id,
    title: props.title,
    definition: props.definition,
    speech: props.speech,
    userId: props.userId,
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    editedWord.tags = clickedBoxes
    const success = await props.editYourWord(editedWord)
    if(success){
      props.setEditSuccess(success)
    }
  }

  const handleInputChange = event => {
    setEditedWord({
      ...editedWord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }


  return(
    <div className="edit-form-container">
      <h3>Edit Your Word!</h3>
      <div>
        <ErrorList errors={props.editErrors} />
      </div>
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
          Title:
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={editedWord.title}/>
        </label>

        <label htmlFor="definition">
          Definition:
          <input
            type="text"
            id="definition"
            name="definition"
            onChange={handleInputChange}
            value={editedWord.definition}/>
        </label>

        <label htmlFor="speech">
          Part of speech:
          <select
            id="speech"
            name="speech"
            onChange={handleInputChange}
            value={editedWord.speech}>
              <option value="">Designate the part of speech</option>
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
export default EditForm
