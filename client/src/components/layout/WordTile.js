import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faEdit } from "@fortawesome/free-solid-svg-icons"
import EditForm from "./EditForm.js"

import Select from 'react-select';

const WordTile = (props) => {

  const { id, title, definition, speech, userId } = props.word
  const [currentFolder, setCurrentFolder] = useState("")
  const [editSuccess, setEditSuccess] = useState(false)

  let deleteButton = null
  let editButton = null
  let showEditForm = null

  const handleDeleteClick = () => {
    props.deleteYourWord(id)
  }

  const handleEditClick = async () => {
    (props.currentWord === id) ? props.setCurrentWord(null) : props.setCurrentWord(id)

    console.log(editSuccess)
    console.log(props.currentWord)

    if(editSuccess){
      setEditSuccess(false)
    }
  }


  const addToOneDict = async (dictName) => {
    const sendObject = { wordId:id, userId:props.user.id, dictName:dictName}
    try{
      const response = await fetch(`/api/v1/profile/${props.user.id}/dictionaries/${dictName}`, {
        method: 'POST',
        headers: new Headers ({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(sendObject),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          setErrors(newErrors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
    } else {

      const formBody = await response.json()
      return true
      }
    } catch(error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }


  const handleDictAdd = (event) => {
    addToOneDict(event.value)
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
        <div className="crud-buttons">
          <FontAwesomeIcon
            icon= {faEdit}
            className="edit-icon fa-lg"
            onClick ={handleEditClick}
          />
        </div>
    }

    if((props.currentWord === id) && !editSuccess){
      console.log("rendered")
      showEditForm =
        <EditForm
          editYourWord = {props.editYourWord}
          setEditSuccess = {setEditSuccess}

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
      <div className="tile-buttons">
        {deleteButton}
        {editButton}
      </div>
      <div className="word-properties">
        <p className="word-title">{title} ({speech[0]}.)</p>
        <p className="word-def">{definition}</p>
      </div>
      <div>
        {showEditForm}
      </div>
      <div>
        <Select
          options = {props.folderOptions}
          placeholder = "Add to your dictionary"
          onChange={handleDictAdd}
          />
      </div>

    </div>
  )

}

export default WordTile