import React from 'react';

const UpdateListItem = ({ update, onClick }) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 

  return (
    <div className="projectDashCard projectUpdateListItem" onClick={onClick}>
      <div>
        <UpdaListItemImage images={update.images} />
        <p className="projectText"> {update.title} </p>
      </div>
      <p className="projectText"> {new Date(update.date).toLocaleDateString("en-US", dateOptions)} </p>
    </div>
  )
}

const UpdaListItemImage = ({ images }) => {
  if (images.length > 0) {
    return <img src={images[0]} style={{ marginRight: '8px' }} />
  } else {
    return null
  }
}

export default UpdateListItem