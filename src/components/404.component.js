import React from 'react'
import MCRing from '../assets/svg/MCRing.svg'
import MCRing2 from '../assets/svg/mcWhole.svg'
import MCRing3 from '../assets/svg/mcWhole1.svg'
import MCRing5 from '../assets/svg/mcWhole3.svg'

import '../css/misc.css'

const Error404 = () => {
  return (
    <div className="Error404">
      <div className="Container404">
        <p className="pHeight">4</p>
        <img className="MCRing" src={MCRing5} alt="" />
        <p className="pHeight">4</p>
      </div>
      <p style={{
        color: "white",
        fontWeight: "bold",
        fontSize: "2em"
      }}> Error </p>
    </div>
  )
}

export default Error404;
