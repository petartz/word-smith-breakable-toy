import React, { useEffect, useState } from "react";
import translateServerErrors from "../../services/translateServerErrors.js"
import { deleteYourWord, filterResults } from "./Requests.js";

import WordTile from "./WordTile";
import FilterForm from "./FilterForm";
import NewWordForm from "./NewWordForm";
import ErrorList from "./ErrorList.js";

import NewFilterForm from "./newFilterForm.js";

const HomePage = (props) => {
  const [words, setWords] = useState([])
  const [showRestricted, setShowRestricted] = useState(false)
  const [restrictedSearch, setRestrictedSearch] = useState(false)

  const [showFilters, setShowFilters] = useState(false)
  const [addWordToggle, setAddWordToggle] = useState(false)

  const [errors, setErrors] = useState([])
  const [editErrors, setEditErrors] = useState([])
  const [currentWord, setCurrentWord] = useState(null)

  const [folderOptions, setFolderOptions] = useState()


  const fetchWordData = async () => {
    try{
      const response = await fetch(`/api/v1/home`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      console.log(body.words)
      setWords(body.words)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }
  const getUserDicts = async () => {
    if (props.user){
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
  }
  useEffect(() => {
      fetchWordData(),
      getUserDicts()
    }, [props.user])


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
      for(let i=0; i<editedWord.tags.length; i++){
        editedWord.tags[i] = {name:editedWord.tags[i]}
      }
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

    folderOptions={folderOptions}

    currentWord={currentWord}
    setCurrentWord={setCurrentWord}

    editErrors={editErrors}
    />
  })

  let newForm = <div className="new-word-not-signed">"Sign in to add new words!"</div>
  let signInToAdd = ""
  if (props.user && addWordToggle){
    newForm = <NewWordForm className="add-word-form" addNewWord={addNewWord}/>
    signInToAdd = ""
  } else if(props.user && !addWordToggle){
    newForm = ""
  } else {
    signInToAdd = "word-tile"
  }

  const hideAdd = () => {
    if(addWordToggle){
      setAddWordToggle(false)
    } else {
      setAddWordToggle(true)
    }
  }



  // Filters showing on click (not using state because asynchronous updating was slow)
  let filterContainer
  const hideFilters = () => {
    if(showFilters){
      setShowFilters(false)
      setShowRestricted(false)
      setRestrictedSearch(false)
    } else {
      setShowFilters(true)
    }
  }
  if(showFilters){
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
        <button className="add-btn" onClick={hideAdd}>Add Word</button>
        <button className="filter-btn" onClick={hideFilters}>Filters</button>
      </div>

      <div>
        <NewFilterForm/>
      </div>

      <div className = "overlay" id="filter-form">
        {filterContainer}
      </div>
      <div className={signInToAdd} id="add-word-form">
        <ErrorList errors={errors}/>
        {newForm}
      </div>
      {wordTiles}
      </div>
  )

}

export default HomePage
