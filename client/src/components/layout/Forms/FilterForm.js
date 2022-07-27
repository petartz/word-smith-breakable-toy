import React, { useState, useEffect } from "react"

const FilterForm = (props) => {
  const [tagOptions, setTagOptions] = useState([])

  let filterList = <li></li>

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
      filterList = tagsArray.map(tag => {
        <li>
          <label>{tag.value}</label>
        </li>
      })
      console.log(filterList)

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
      {filterList}
      </ul>
    </div>
  )
}

export default FilterForm