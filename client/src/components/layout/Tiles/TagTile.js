import React, { useState, useEffect } from "react"

const TagTile = (props) => {
  return (
    <div className="tag-tile">
      {props.tagName}
    </div>
  )
}

export default TagTile