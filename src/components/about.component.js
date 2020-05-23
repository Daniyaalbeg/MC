import React from 'react';
import '../css/about.css'
import McLogo from '../assets/McLogo.png'

// import akho from '../assets/logo/akho.svg'
import badlde from '../assets/logo/badlde.png'
import serendip from '../assets/logo/serendip.jpg'

const About = () => {
  return (
    <div className="aboutContainer">
      {/* <div className="iconAbout">
        <Icon />
      </div> */}
      <img className="mcLogoAbout" src={McLogo} alt="Not found" />

      <hr className="logoSeperator"/>

      <h1 className="header"> <span className="aboutText">About</span> <span className="usText">Us</span> </h1>

      <div className="aboutDiv1 aboutDivShared">
        <p className="aboutBody">
          Ministry of Change is launching the first of its sites to serve the citizens of this world to make good work visible to everyone.
        </p>
      </div>
      <div className="aboutDiv2 aboutDivShared">
        <p className="aboutBody">
          A lot is being done that never makes it on media or in the public sphere. People are doing good good everywhere. They do not wait for anyone. In disasters and now in this pandemic many people are getting on with doing the best they can for others. Ministry of change wants to track this good work and make it visible to show what is happening. Is is also crucial that we understand who is doing what and where. This will help decision makers and organizations to better their service as well as avoid duplication.
        </p>
      </div>
      <div className="aboutDiv3 aboutDivShared">
        <p className="aboutBody">
        In this COVID 19 state of lockdown people have lost their livelihoods. Hunger is principally the biggest challenge. People have stepped up to give food rations to where they can reach. Some are documenting them whilst others are not. We need to use this opportunity to make sure we have identified the poor and the needy so they can be helped consistently.
        </p>
      </div>
      <div className="aboutDiv4 aboutDivShared">
        <p className="aboutBody">
          Other items are being distributed as well including cash and PPEs.
        </p>
      </div>
      <div className="aboutDiv5 aboutDivShared">
        <p className="aboutBody">
          In many of the past disasters the beneficiaries were not documented nor a verified database formed. When the 2010 floods came we again repeated the same mistake and did not consolidate this data so that poverty can be attacked from all sides and not only in disasters.
        </p>
      </div>
      <div className="aboutDiv6 aboutDivShared">
        <p className="aboutBody">
          This site maps locations, shows you who is the giver, what were the items and who received them. Apart from rations MC records cash, clothes and personal protective equipment PPEs.
        </p>
      </div>

      <hr className="seperator" />

      <div className="aboutLogo">
        <h4 className="aboutOurPartners" > Our Partners </h4>
        <div className="logoRow">
          {/* <a href="http://akho.org.pk" target="_blank" rel="noopener noreferrer"><img className="logoImage grow" src={akho} alt="error" /></a> */}
          <a href="https://badlde.org" target="_blank" rel="noopener noreferrer"><img className="logoImage grow" src={badlde} alt="error" /></a>
          <a href="http://serendip.tv" target="_blank" rel="noopener noreferrer"><img className="logoImage grow" src={serendip} alt="error" /></a>
        </div>
      </div>

      <div className="aboutBottomSpace" />

    </div>
  )
}



export default About