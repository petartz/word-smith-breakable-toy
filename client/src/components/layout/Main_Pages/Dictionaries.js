import React, { useState, useEffect } from "react"
import FolderTile from "../Tiles/FolderTile"
import MenuCloseIcon from "../../assets/MenuCloseIcon.js";
import ErrorList from "../Errors/ErrorList.js";
import NewDictForm from "../Forms/NewDictionaryForm.js";

const Dictionaries = (props) => {
  const [folderOptions, setFolderOptions] = useState([])
  const [errors, setErrors] = useState([])

  const getDictionaries = async () => {
    try{
      const response = await fetch(`/api/v1/dictionaries`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      console.log(body.homeFolders)
      setFolderOptions(body.homeFolders)

    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
      getDictionaries()
  }, [props.user])


  const addNewDict = async (formPayLoad) => {
    formPayLoad.userId = props.user.id
    try{
      const response = await fetch(`/api/v1/dictionaries`, {
        method: 'POST',
        headers: new Headers ({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(formPayLoad),
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
      setFolderOptions([formBody.folder, ...folderOptions])
      setErrors([])
      return true
      }
    } catch(error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }


  const toggleAdd = () => {
    if (props.user){
      document.getElementById('addDictOverlay').classList.toggle('closed')
    } else {
      alert("Sign in to add dictionaries!")
    }
  }



  const folderTiles = folderOptions.map(folder => {
    return(
      <FolderTile
      key={folder.id}
      folder={folder}
      />    )
  })


  return (

    <div className="dictionary-container">
      <button className="add-button button-style" onClick={toggleAdd}>Add Dictionary</button>
        <div className="addDictOverlay closed" id="addDictOverlay">
          <div className="menu-close" onClick={toggleAdd}>
            {MenuCloseIcon}
          </div>
          <NewDictForm addNewDict={addNewDict}/>
          <div>
            <ErrorList errors={errors}/>
          </div>
        </div>
      {folderTiles}
    </div>
  )
}

export default Dictionaries