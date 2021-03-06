import React, { useState, useEffect } from "react"
import { withRouter } from "react-router" // <- here
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const NewFilterForm = (props) => {
  const [tagOptions, setTagOptions] = useState([])
  const [clickedTags, setClickedTags] = useState([])

  const animatedComponents = makeAnimated();

  const fetchTags = async () => {
    let dictionaryId = props.match.params.id

    try{
      const response = await fetch(`/api/v1/dictionaries/${dictionaryId}/tags`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      let tagsArray = []
      body.tags.forEach(tag => {
        tagsArray = [...tagsArray, { value:tag.name, label:tag.name }]
      })
      setTagOptions(tagsArray)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  const handleClick = (event) => {
    setClickedTags(event)
    if (event.length === 0){
      props.resetWords()
      // props.setShowRestricted(false)
      // props.setRestrictedSearch(false)
    } else if (event.length < 3) {
      // props.setShowRestricted(false)
      // props.setRestrictedSearch(false)
    } else if (event.length >= 3){
      // props.setShowRestricted(true)
    } else {
    }
  }

  const handleRestrict = (event) => {
    if(!props.restrictedSearch){
      props.setRestrictedSearch(true)
    }else{
      props.setRestrictedSearch(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (clickedTags.length >= 1){
      let tagsArray = clickedTags.map(tag => tag.value)
      await props.filterResults(tagsArray)
    } else {
      alert("You've selected no filters!")
    }
  }

  let restrictedBox
  if(props.showRestricted){
    restrictedBox =
            (<div>
              <input htmlFor="restrict"
                name="restrict"
                type="checkbox"
                onClick={handleRestrict} />
                <label>Restrict the Search!</label>
            </div>)
  }



  return (
      <form className="new-filter-form" onSubmit={handleSubmit} >
        <div>
          {restrictedBox}
        </div>
        <div>
          <Select
          placeholder="Filter words by tags"
          className = "select-new"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          onChange = {handleClick}
          options={tagOptions}
          />
        </div>
        <div className="filter-submit">
          <input className="button-style" htmlFor="submit" value="Filter Results!" type="submit"/>
        </div>
      </form>
  )
}

export default withRouter(NewFilterForm)