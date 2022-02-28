import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import EditForm from "./EditForm.js"

import Select from 'react-select';

const WordTile = (props) => {

  const { id, title, definition, speech, userId } = props.word
  const [currentFolder, setCurrentFolder] = useState("")

  let deleteButton = null
  let editButton = null
  let showEditForm = null

  const handleDeleteClick = () => {
    props.deleteYourWord(id)
  }
  const handleEditClick = async () => {
    (props.currentWord === id) ? props.setCurrentWord(null) : props.setCurrentWord(id)
  }


  const addToOneDict = async (dictName) => {
    try{
      const response = await fetch(`/api/v1/profile/${userId}/dictionaries/${dictName}`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setCurrentFolder(body.folder)
      console.log(body.folder)
      console.log(currentFolder)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
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
            className="myButton"
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
      <div className="word-properties">
        <p className="word-title">{title} ({speech[0]}.)</p>
        <p className="word-def">{definition}</p>
      </div>
      <div>
        {editButton}
        {showEditForm}
      </div>
      <div>
        <Select
          options = {props.folderOptions}
          placeholder = "Add to your dictionary"
          onChange={addToOneDict}
          />
      </div>

    </div>
  )

}

export default WordTile