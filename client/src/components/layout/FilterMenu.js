import React, { useState, useEffect } from "react"

const FilterMenu = (props) => {
  const [tagOptions, setTagOptions] = useState([props.tags])
  const [clickedTags, setClickedTags] = useState([])

  const fetchTags = async () => {
    try{
      const response = await fetch(`/api/v1/home/tags`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()

      body.tags.forEach(tag => {
        let listElement = document.createElement('li')
        let checkbox = document.createElement('input')
        let label = document.createElement('label')
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', tag.name);
        label.textContent = `${tag.name}`
        listElement.appendChild(checkbox)
        listElement.appendChild(label)
        document.getElementById("filters-container").appendChild(listElement)
      })
      // console.log(tagsArray)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])


  return (
      <form className="filter-menu">
        <ul className="filters-container" id="filters-container">
        </ul>
      </form>
  )
}

export default FilterMenu