import React, { useEffect, useState } from "react";
import translateServerErrors from "../../services/translateServerErrors.js"

import { deleteYourWord, filterResults } from "./Requests.js";

import WordTile from "./WordTile";
import FilterForm from "./FilterForm";
import NewWordForm from "./NewWordForm";
import ErrorList from "./ErrorList.js";

const HomePage = (props) => {
  const [words, setWords] = useState([])
  const [showRestricted, setShowRestricted] = useState(false)
  const [restrictedSearch, setRestrictedSearch] = useState(false)

  const [filters, setFilters] = useState(false)
  const [addWord, setAddWord] = useState(false)

  const [errors, setErrors] = useState([])
  const [editErrors, setEditErrors] = useState([])
  const [currentUser, setCurrentUser] = useState(props.user)
  const [currentWord, setCurrentWord] = useState(null)

  const fetchWordData = async () => {
    try{
      const response = await fetch("/api/v1/home")
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setWords(body.words)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }
  useEffect(() => {
    fetchWordData()
  }, [])


  const filter = async (tags) => {
    const words = await filterResults(tags, restrictedSearch)
    console.log(words)
    setWords(words)
  }

  const wordDelete = (wordId) => {
    deleteYourWord(wordId)

    const updatedWords = words.filter(word => word.id != wordId)
    setWords(updatedWords)
  }



  const addNewWord = async (formPayLoad) => {
    formPayLoad.userId = props.user.id
    try{
      const response = await fetch("/api/v1/home", {
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
      setWords([formBody.word, ...words])
      setErrors([])
      return true
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
      const replacedWord = words.find(word => word.id === editedWord.id)
      const replacedIndex = words.indexOf(replacedWord)
      const allWords = words.filter(word => word.id != editedWord.id)
      allWords.splice(replacedIndex, 0, editedWord)

      setEditErrors([])
      setWords(allWords)

      return true
    } catch(error) {
      console.log('you messed up')
    }
  }

  const wordTiles = words.map(word => {
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

  let newForm = "Sign in to add new words!"
  if (props.user && addWord){
    newForm = <NewWordForm className="add-word-form" addNewWord={addNewWord}/>
  } else {
    newForm = ""
  }
  const hideAdd = () => {
    if(addWord){
      setAddWord(false)
    } else {
      setAddWord(true)
    }
  }



  // Filters showing on click (not using state because asynchronous updating was slow)
  let filterContainer
  const hideFilters = () => {
    if(filters){
      setFilters(false)
      setShowRestricted(false)
    } else {
      setFilters(true)
    }
  }
  if(filters){
    filterContainer = <FilterForm
    filterResults={filter}
    showRestricted={showRestricted}
    setShowRestricted={setShowRestricted}
    restrictedSearch={restrictedSearch}
    setRestrictedSearch={setRestrictedSearch}/>
  } else {
    filterContainer = ""
  }

  return(
    <div className="home-main">
      <div className="home-buttons">
        <button className="add-btn link" onClick={hideAdd}>Add Word</button>
        <button className="filter-btn link" onClick={hideFilters}>Filters</button>
      </div>
      <div className = "overlay" id="filter-form">
        {filterContainer}
      </div>
      <div className="" id="add-word-form">
        <ErrorList errors={errors}/>
        {newForm}
      </div>
      <div>
      {wordTiles}
      </div>
    </div>
  )

}

export default HomePage
