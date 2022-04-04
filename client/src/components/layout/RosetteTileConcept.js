import React from "react"

const RosetteTileConcept = (props) => {
  console.log(props.concept)
  return (
    <div className="concept">
      {props.concept.phrase}
    </div>
  )
}

export default RosetteTileConcept