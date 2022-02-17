import React, { useEffect, useState } from "react";
import WordTile from "./WordTile";
import FilterForm from "./FilterForm";
import NewWordForm from "./NewWordForm";

const HomePage = (props) => {
  const [words, setWords] = useState([])
  const [showRestricted, setShowRestricted] = useState(false)
  const [restrictedSearch, setRestrictedSearch] = useState(false)

  const [currentUser, setCurrentUser] = useState(props.user)



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


  const filterResults = async (formPayLoad) => {
    const userObject = {tags:formPayLoad, restriction:restrictedSearch}
    try{
      const response = await fetch("/api/v1/home/filter", {
        method: 'POST',
        headers: new Headers ({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(userObject),
      })
      if(!response.ok){
        throw(new Error(`${response.status} ${response.statusText}`))
      }
      const formBody = await response.json()
      console.log(formBody.words)

      setWords([...formBody.words])
    } catch(error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
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
      if(!response.ok){
        throw(new Error(`${response.status} ${response.statusText}`))
      }
      const formBody = await response.json()
      console.log(formBody)
      // setWords([...words, formBody.word])

    } catch(error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const wordTiles = words.map(word => {
    return <WordTile
    key= {word.id}
    word={word}/>
  })

  let newForm = "Sign in to add new words!"
  if (props.user){
    newForm = <NewWordForm addNewWord={addNewWord}/>
  }

  return(
    <div>
      <button className="button">Filters</button>
        <div>
          <FilterForm
            filterResults={filterResults}
            showRestricted={showRestricted}
            setShowRestricted={setShowRestricted}

            restrictedSearch={restrictedSearch}
            setRestrictedSearch={setRestrictedSearch}/>
        </div>
        <div className="add-word-form">
          {newForm}
        </div>
      <div>
      {wordTiles}
      </div>
    </div>
  )
}

export default HomePage