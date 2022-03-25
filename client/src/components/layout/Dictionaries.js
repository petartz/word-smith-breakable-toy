import React, { useState, useEffect } from "react"
import FolderTile from "./FolderTile.js"
import { Link } from "react-router-dom";


const Dictionaries = (props) => {
  const [folderOptions, setFolderOptions] = useState([])

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


  const toggleAdd = () => {
    document.getElementById('addDictOverlay').classList.toggle('closed')
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
      <button className="add-button button-style" onClick={toggleAdd}>Add Word</button>
        <div className="addDictOverlay closed" id="addDictOverlay">

        </div>
      {folderTiles}
    </div>
  )
}

export default Dictionaries