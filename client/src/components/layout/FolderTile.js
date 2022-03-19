import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const FolderTile = (props) => {

  const { id, name, description, image, userId } = props.folder

  return(
    <div className="folder-tile">
      <Link to={`/dictionaries/${id}`}>
        <div>
          <h1>
              {name}
          </h1>
          <h5>
            {description}
          </h5>
          <img src={image} alt={name}></img>
        </div>
      </Link>

    </div>
  )

}

export default FolderTile