import React, { useEffect, useState } from "react";
import { withRouter } from "react-router" // <- here
import translateServerErrors from "../../../services/translateServerErrors.js"
import { deleteYourWord, filterResults } from "../Requests.js";
import WordTile from "../Tiles/WordTile";
import NewWordForm from "../Forms/NewWordForm";
import ErrorList from "../Errors/ErrorList.js";
import NewFilterForm from "../olderVersions/newFilterForm.js";
import FilterMenu from "../Forms/FilterMenu.js";
import MenuCloseIcon from "../../assets/MenuCloseIcon.js";

const DictionaryShow = (props) => {
  const [words, setWords] = useState([])
  const [tags, setTags] = useState([])

  const [showRestricted, setShowRestricted] = useState(false)
  const [restrictedSearch, setRestrictedSearch] = useState(false)

  const [errors, setErrors] = useState([])
  const [editErrors, setEditErrors] = useState([])
  const [currentWord, setCurrentWord] = useState(null)

  const [folderOptions, setFolderOptions] = useState()

  let dictionaryId = props.match.params.id

  const fetchWordData = async () => {
    // debugger
    try{
      const response = await fetch(`/api/v1/dictionaries/${dictionaryId}`)
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


  const filter = async (tags, dictId) => {
    const words = await filterResults(tags, restrictedSearch, dictId)
    console.log(words)
    setWords(words)
  }

  const wordDelete = (wordId) => {
    deleteYourWord(wordId, dictionaryId)

    const updatedWords = words.filter(word => word.id != wordId)
    setWords(updatedWords)
  }

  const addNewWord = async (formPayLoad) => {
    formPayLoad.userId = props.user.id
    formPayLoad.dictionaryId = dictionaryId
    try{
      const response = await fetch(`/api/v1/dictionaries/${dictionaryId}`, {
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
      const response = await fetch(`/api/v1/dictionaries/${dictionaryId}/edit`, {
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

  const toggleAdd = () => {
    if (props.user){
      document.getElementById('overlay').classList.toggle('closed')
    } else {
      alert("Sign in to add words")
    }
  }

  const toggleFilters = () => {
    document.getElementById('filter-sidebar').classList.toggle('closed')
  }

  const closeFilters = () => {
    if(!document.getElementById('filter-sidebar closed'))
    document.getElementById('filter-sidebar').classList.add('closed')
  }
//why needed

  return(
    <div className="home-main">
      <button className="add-button button-style" onClick={toggleAdd}>Add Word</button>
      <button className="filter-button button-style" onClick={toggleFilters}>Filters</button>

      <div className="overlay closed" id="overlay">
        <div className="menu-close" onClick={toggleAdd}>
          {MenuCloseIcon}
        </div>
        <NewWordForm addNewWord={addNewWord}/>
        <div>
          <ErrorList errors={errors}/>
        </div>
      </div>

      <div className="filter-sidebar closed" id="filter-sidebar">
        <div className="menu-close" onClick={toggleFilters}>
          {MenuCloseIcon}
        </div>
        <FilterMenu
          resetWords={fetchWordData}
          restrictedSearch={restrictedSearch}
          setRestrictedSearch={setRestrictedSearch}
          toggleFilters={toggleFilters}
          filterResults={filter}
        />
      </div>

      <div className="filter-page">
        <NewFilterForm
          resetWords = {fetchWordData}
          filterResults={filter}
          showRestricted={showRestricted}
          setShowRestricted={setShowRestricted}
          restrictedSearch={restrictedSearch}
          setRestrictedSearch={setRestrictedSearch}
        />
      </div>

      <div className="non-filter-page" onClick={closeFilters}>
        <div className="home-tiles">
          {wordTiles}
        </div>
      </div>
    </div>
  )

}
export default withRouter(DictionaryShow)
