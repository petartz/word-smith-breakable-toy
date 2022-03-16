import React, { useState, useEffect } from "react"

const FilterForm = (props) => {
  const [tagOptions, setTagOptions] = useState([])

  let legend = "Hello"

  const fetchTags = async () => {
    try{
      const response = await fetch(`/api/v1/home/tags`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      let tagsArray = []
      body.tags.forEach(tag => {
        tagsArray = [...tagsArray, { value:tag.name, label:tag.name }]
      })

      console.log(tagsArray)
      legend = tagsArray.map(tag => {
        <li>
          <label>{tag.value}</label>
        </li>
      })
      console.log(legend)

      setTagOptions(tagsArray)

    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])



  return (
    <div>
      <ul className="filter-form">
      {legend}
      </ul>
    </div>
  )
}

export default FilterForm