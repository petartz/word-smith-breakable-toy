import React, { useState, useEffect } from "react"
import WordTile from "./WordTile.js"
import { deleteYourWord } from "./Requests.js"

import CreatableSelect from 'react-select/creatable';

const UserProfile = props => {
  const [userWords, setUserWords] = useState([])
  const [wordCloud, setWordCloud] = useState()

  const [folderOptions, setFolderOptions] = useState([])
  const [currentFolder, setCurrentFolder] = useState("")

  const [editErrors, setEditErrors] = useState([])
  const [currentWord, setCurrentWord] = useState(null)


  const fetchWordData = async () => {
    try{
      const response = await fetch(`/api/v1/profile/${props.user.id}`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setUserWords(body.words)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }
  useEffect(() => {
    fetchWordData(),
    getUserDicts()
  }, [])

  const wordDelete = (wordId) => {
    deleteYourWord(wordId)
    const updatedWords = userWords.filter(word => word.id != wordId)
    setUserWords(updatedWords)
  }

  const wordCloudGen = async () => {
    // console.log(userWords)
    let userWordsText = ""
    userWords.forEach(word =>{
      userWordsText += ` ${(word.definition)}`
    })
    userWordsText = userWordsText.replace(/\s[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase()

    console.log(userWordsText)

    const sendBody = JSON.stringify({
      "text": userWordsText,
      "rotation": 1,
      "height": 400,
      'fontScale': 30,
      'backgroundColor': "#f7ede2",
      'font-family': "serif",
      'scale': 'linear',
      "colors": ["#e9c46a", "#e76f51", "#2a9d8f", "#f9844a"],
      "maxNumWords": 20,
      'removeStopwords': true,
      'minWordLength': 2,
    })
    try{
      const response = await fetch('/api/v1/wordCloud', {
        method: 'POST',
        headers: new Headers ({
          'Content-Type': 'application/json',
        }),
        body: sendBody
      })

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }else {
        const responseBody = await response.json()

        const parser = new DOMParser()
        let svg = parser.parseFromString(responseBody.svg, "text/html")
        console.log(svg.body.firstChild)
        svg.body.firstChild.setAttribute("width", "100%")

        if (document.querySelector("#word-cloud").children.length === 0){
          document.querySelector("#word-cloud").appendChild(svg.body.firstChild)
          document.querySelector("#word-cloud").classList.add("word-tile")
          document.querySelector("#word-cloud").classList.add("cloudies")
        } else {
          document.querySelector("#word-cloud").removeChild(document.querySelector("#word-cloud").firstChild)
          document.querySelector("#word-cloud").appendChild(svg.body.firstChild)
        }
      }
    } catch(error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }


  const editYourWord = async (editedWord) => {
    try {
      const response = await fetch(`/api/v1/home/edit`, {
        method: "POST",
        headers: new Headers({
          "Content-Type" : "application/json"
        }),
        body: JSON.stringify(editedWord)
      })

      if (!response.ok){
        if(response.status === 422){
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          setEditErrors(newErrors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const replacedWord = userWords.find(word => word.id === editedWord.id)
      const replacedIndex = userWords.indexOf(replacedWord)
      const allWords = userWords.filter(word => word.id != editedWord.id)
      for(let i=0; i<editedWord.tags.length; i++){
        editedWord.tags[i] = {name:editedWord.tags[i]}
      }

      allWords.splice(replacedIndex, 0, editedWord)

      setEditErrors([])
      setUserWords(allWords)

      return true
    } catch(error) {
      console.log('you messed up')
    }
  }


  const getUserDicts = async () => {
    try{
      const response = await fetch(`/api/v1/profile/${props.user.id}/dictionaries`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setFolderOptions(body.folders)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  let wordTiles = []
  if(userWords.length > 0){
    wordTiles = userWords.map(word => {
      return <WordTile
      key= {word.id}
      word={word}
      deleteYourWord={wordDelete}
      editYourWord ={editYourWord}
      user={props.user}

      currentWord={currentWord}
      setCurrentWord={setCurrentWord}

      editErrors={editErrors}
      />
    })
  }

  const createDictionary = async (formPayLoad) => {
    const folderObject = {
      name: formPayLoad,
      userId: props.user.id
    }
    try{
      const response = await fetch(`/api/v1/profile/${props.user.id}/dictionaries`, {
        method: 'POST',
        headers: new Headers ({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(folderObject),
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
    }
    } catch(error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const getOneDict = async (dictName) => {
    try{
      const response = await fetch(`/api/v1/profile/${props.user.id}/dictionaries/${dictName}`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setUserWords(body.words)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleDictType = (event) => {
    if(event === null){
    } else if (event.__isNew__) {
      createDictionary(event.value)
      setFolderOptions([...folderOptions, { label: event.value, value: event.value }])
    } else {
      getOneDict(event.value)
    }
  }

  return (
    <>
      <div className="grid-x">
        <div className="cell small-6">
          <div className="profile-left">
            <div className="dictionaries">
              <CreatableSelect
                placeholder={"Select Dictionary or Create New"}
                className="select"
                isClearable
                onChange={handleDictType}
                options={folderOptions}
              />
            </div>
            <div className="words">
                {wordTiles}
              </div>
          </div>
        </div>

        <div className="cell small-6">
          <div className="profile-right">
            <div className="cloud-button">
              <button className="wordCloud-button" onClick={wordCloudGen}>Generate Word Cloud</button>
            </div>
            <div className="word-cloud" id="word-cloud"/>
          </div>
        </div>
      </div>
    </>

  )
}

export default UserProfile