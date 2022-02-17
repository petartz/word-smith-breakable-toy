import React, { useState } from "react"

const FilterForm = (props) => {
  const [clickedBoxes, setClickedBoxes] = useState([])


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
    await props.filterResults(clickedBoxes)


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
    <div className="filter-form">
      <form htmlFor="filter-form" onSubmit={handleSubmit}>
        <label> Filter results by their tags!</label>
          {restrictedBox}
          <div className="temporal">
            <ul>
              <input htmlFor="past" name="past" type="checkbox" onClick={handleClick} />
              <label>Past</label>
              <input htmlFor="change" name="change" type="checkbox" onClick={handleClick} />
              <label>Change</label>
              <input htmlFor="future" name="future" type="checkbox" onClick={handleClick} />
              <label>Future</label>
            </ul>
          </div>
          <div className="interpersonal">
            <ul>
              <input htmlFor="self" name="self" type="checkbox" onClick={handleClick} />
              <label>Self</label>
              <input htmlFor="people" name="people" type="checkbox" onClick={handleClick} />
              <label>People</label>
            </ul>
          </div>
          <div className="emotion">
            <ul>
              <input htmlFor="happy" name="happy" type="checkbox" onClick={handleClick} />
              <label>Happy</label>
              <input htmlFor="sad" name="sad" type="checkbox" onClick={handleClick} />
              <label>Sad</label>
              <input htmlFor="angry" name="angry" type="checkbox" onClick={handleClick} />
              <label>Angry</label>
              <input htmlFor="anxious" name="anxious" type="checkbox" onClick={handleClick} />
              <label>Anxious</label>
              <input htmlFor="exhausted" name="exhausted" type="checkbox" onClick={handleClick} />
              <label>Exhausted</label>
              <input htmlFor="desire" name="desire" type="checkbox" onClick={handleClick} />
              <label>Desire</label>
            </ul>
          </div>
          <div className="">
            <ul>
              <input htmlFor="disconnected" name="disconnected" type="checkbox" onClick={handleClick} />
              <label>Disconnected</label>
              <input htmlFor="connected" name="connected" type="checkbox" onClick={handleClick} />
              <label>Connected</label>
            </ul>
          </div>

          <input htmlFor="submit" value="Filter Results!" type="submit"/>
      </form>
    </div>
  )
}

export default FilterForm