import React, { useEffect, useState } from "react";
import translateServerErrors from "../../services/translateServerErrors.js"

const deleteYourWord = async (wordId) => {
  try {
    const response = await fetch(`/api/v1/home/delete`, {
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





export {deleteYourWord}