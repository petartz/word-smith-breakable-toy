const cleanUserInput = formInput => {
  Object.keys(formInput).forEach(field => {
    if(formInput[field] === ""){
      delete formInput[field]
    }else if(typeof formInput[field]=== "string" && formInput[field].trim() === ""){
      delete formInput[field]
    }
  })

  formInput.non_latin_title = "unknown"
  formInput.author = "unknown"
  formInput.authorPicture = "unknown"
  formInput.video = "unknown"
  formInput.entry = 1
  formInput.hasQuotes = 0

  return formInput
}

export default cleanUserInput