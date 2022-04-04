import React, { useState } from "react"

const RosetteTile = (props) => {
  return (
    <div className="concept-tile">
      {props.phrase.phrase}
    </div>
  )
}

export default RosetteTile