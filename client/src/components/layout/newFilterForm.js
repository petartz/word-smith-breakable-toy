import React, { useState, useEffect } from "react"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const NewFilterForm = (props) => {
  const [tagOptions, setTagOptions] = useState([])
  const [clickedBoxes, setClickedBoxes] = useState([])

  const animatedComponents = makeAnimated();

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
      setTagOptions(tagsArray)

    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  const handleClick = (event) => {
    if (!(clickedBoxes.includes(event.currentTarget.name))){
      setClickedBoxes([...clickedBoxes, event.currentTarget.name])
      if(clickedBoxes.length >= 1){
        props.setShowRestricted(true)
      }
      return true
    } else {
      let newBoxes = clickedBoxes.filter(attribute => attribute != event.currentTarget.name)
      setClickedBoxes(newBoxes)
      if(clickedBoxes.length < 3){
        props.setShowRestricted(false)
        props.setRestrictedSearch(false)
      }
      return false
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
    if (clickedBoxes.length >= 1){
      await props.filterResults(clickedBoxes)
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
    <div>
      <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      // defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={tagOptions}
      />
    </div>
  )
}

export default NewFilterForm