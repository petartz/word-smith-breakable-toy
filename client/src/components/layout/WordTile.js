import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import EditForm from "./EditForm.js"

const WordTile = (props) => {

  const { id, title, definition, speech, userId } = props.word

  let deleteButton = null
  let editButton = null
  let showEditForm = null

  const handleDeleteClick = () => {
    props.deleteYourWord(id)
  }
  const handleEditClick = async () => {
    (props.currentWord === id) ? props.setCurrentWord(null) : props.setCurrentWord(id)
  }


  if (props.user) {
    if (props.user.id === userId) {
      deleteButton =
        <div className="crud-buttons">
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="delete-icon fa-lg"
            onClick ={handleDeleteClick}
          />
        </div>
      editButton =
        <div>
          <button
            className="button"
            onClick={handleEditClick}>
            Edit Your Word
          </button>
        </div>
    }

    if((props.currentWord === id)){
      showEditForm =
        <EditForm
          handleEditClick = {handleEditClick}
          editYourWord = {props.editYourWord}
          editErrors = {props.editErrors}
          id = {id}
          title = {title}
          definition = {definition}
          speech = {speech}
          userId = {userId}
        />
    }


  }


  return(
    <div className="word-tile">
      <div>
        {deleteButton}
      </div>
      <p>Word: {title}</p>
      <p>Definition: {definition}</p>
      <p>Part of Speech: {speech}</p>
      <div>
        {editButton}
        {showEditForm}
      </div>
    </div>
  )

}

export default WordTile