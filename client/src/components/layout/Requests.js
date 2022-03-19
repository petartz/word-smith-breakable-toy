import React, { useEffect, useState } from "react";
import translateServerErrors from "../../services/translateServerErrors.js"

const deleteYourWord = async (wordId) => {
  try {
    const response = await fetch(`/api/v1/dictionaries/${dictionaryId}/delete`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ wordId })
    })
    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json()
        alert(body.message)
      }
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw(error)
    }

  } catch (error) {
    return console.error(`Error in fetch: ${error.message}`)
  }
}

const filterResults = async (formPayLoad, restrictedSearch) => {
  const userObject = { tags:formPayLoad, restriction:restrictedSearch }
  try{
    const response = await fetch(`/api/v1/dictionaries/${dictionaryId}/filter`, {
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
    return formBody.words

  } catch(error) {
    return console.error(`Error in fetch: ${error.message}`)
  }
}





export { deleteYourWord, filterResults }