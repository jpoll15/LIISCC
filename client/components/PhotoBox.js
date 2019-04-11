import React from 'react'

function PhotoBox(props) {
  const {photo, selectPhoto} = props
  return (
    <img className="thumbnail" src={photo.thumbnailUrl} onClick={() => {selectPhoto(photo)}} />
  )
}

export default PhotoBox
