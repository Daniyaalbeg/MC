import React from 'react';

const ProfileInfoView = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  return (
    <div>
      <br />
      <h6 className="text-muted"> Username </h6>
      <p> {props.username} </p>
      <hr />
      <h6 className="text-muted"> Email </h6>
      <p> {props.email} </p>
      <hr />
      <h6 className="text-muted"> Approved </h6>
      <p> {props.approved ? "You have been approved" : "You have not been approved"} </p>
      <hr />
      <h6 className="text-muted"> You created this account on </h6>
      <p> {new Date(props.createdAt).toLocaleDateString("en-US", dateOptions)} </p>
    </div>
  )
}

export default ProfileInfoView;