import React, { useState, useEffect } from "react"
import CheckMarkIcon from "../assets/CheckMarkIcon"

const FilterMenu = (props) => {
  const [tagOptions, setTagOptions] = useState([])
  const [clickedTags, setClickedTags] = useState([])

  const fetchTags = async () => {
    try{
      const response = await fetch(`/api/v1/home/tags`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setTagOptions(body.tags)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }
  useEffect(() => {
    fetchTags()
  }, [])


  const handleClick = (event) => {
    console.log(event.currentTarget.name)
    if (!(clickedTags.includes(event.currentTarget.name))){
      setClickedTags([...clickedTags, event.currentTarget.name])
      return true
    } else {
      let newBoxes = clickedTags.filter(attribute => attribute != event.currentTarget.name)
      setClickedTags(newBoxes)
      return false
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (clickedTags.length >= 1){
      await props.filterResults(clickedTags)
    } else {
      alert("You've selected no filters!")
    }
  }

  const handleRestrict = (event) => {
    props.setRestrictedSearch(!props.restrictedSearch)
  }

  let listOfTags = tagOptions.map(tag => {
    return (
      <li className="filter-tiles" key={tag.name}>
        <input htmlFor={tag.name} name={tag.name} type="checkbox" onClick={handleClick} />
          <label>{tag.name}</label>
      </li>
    )
  })

  let restrictedBox =
  (<li className="restriction-tile">
    <input htmlFor="restrict"
      name="restrict"
      type="checkbox"
      onClick={handleRestrict} />
      <label>Restrict the Search!</label>
  </li>)

  return (
      <form className="filter-menu">
        <div className="check-mark" onClick={handleSubmit}>
          {CheckMarkIcon}
        </div>
        <ul className="filters-container" id="filters-container">
          {restrictedBox}
          {listOfTags}
        </ul>
      </form>
  )
}

export default FilterMenu