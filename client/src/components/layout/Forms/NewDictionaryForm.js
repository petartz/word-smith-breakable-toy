import React, { useState } from "react"

const NewDictForm = props => {
  const [newDict, setNewDict] = useState({
    name: "",
    description: "",
    image: ""
  })


  const handleInputChange = event => {
    setNewDict({
      ...newDict,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setNewDict({
      name: "",
      description: "",
      image: ""
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await props.addNewDict(newDict)
    if(success){
      clearForm()
    }
  }

  return(
    <div className="add-word-form">
      <form onSubmit = {handleSubmit}>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={newDict.name}
            placeholder="Name"
            />
        </label>

        <label htmlFor="description">
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={newDict.description}
            placeholder="Description"
            />
        </label>

        <label htmlFor="image">
          <input
            type="text"
            id="image"
            name="image"
            onChange={handleInputChange}
            value={newDict.image}
            placeholder="Image url"
            />
        </label>
        <input className="add-submit" type="submit"/>
      </form>
    </div>
  )
}

export default NewDictForm