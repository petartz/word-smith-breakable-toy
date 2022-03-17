import React, { useState, useEffect } from "react"

const Dictionaries = (props) => {
  const [folderOptions, setFolderOptions] = useState([])

  const getDictionaries = async () => {
    if (props.user){
      try{
        const response = await fetch(`/api/v1/dictionaries`)
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        const body = await response.json()
        console.log(body)
        setFolderOptions(body.homeFolders)
      } catch (error) {
        return console.error(`Error in fetch: ${error.message}`)
      }
    }
  }

  useEffect(() => {
      getDictionaries()
  }, [props.user])


  return (
    <div>
      {folderOptions}
    </div>
  )
}

export default Dictionaries