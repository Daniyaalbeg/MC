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
          Ministry of Change: Changing the World 
        </p>
      </div>
      <div className="aboutDiv2 aboutDivShared">
        <p className="aboutBody">
          The future of activism is here. The Ministry of Change (MC) is a digital platform that match-makes those in need with those with resources, enabling a simpler way of doing good. When it comes to doing good work, we take out the “work”, so you can focus on the “good”. 
        </p>
      </div>
      <div className="aboutDiv3 aboutDivShared">
        <p className="aboutBody">
          Who are you? You could be an individual citizen, a government, a corporation, or a philanthropist.
        </p>
      </div>
      <div className="aboutDiv4 aboutDivShared">
        <p className="aboutBody">
          Our platform enables you to crowdsource money, supplies, and volunteers through a highly engaged network of individuals who are interested in activism. Easily find and reach out to likeminded do-gooders through our social network. Our online database lets you connect, organise, and mobilise in just a few clicks to make a powerful impact on the causes you care about.
        </p>
      </div>
      <div className="aboutDiv5 aboutDivShared">
        <p className="aboutBody">
          Browse through development projects that inspire and excite you - from education and healthcare to justice and climate change. Find grassroots volunteers to help, donors to fund, and development organisations with training, resources, and expertise to move your work forward. 
        </p>
      </div>
      <div className="aboutDiv6 aboutDivShared">
        <p className="aboutBody">
          Not only do we set you up for success, but donors get to work with trustworthy and accountable leaders whilst  making their impact visible. 
          We’re here to disrupt the bureaucracy and roadblocks of getting good things done. We are improving the development services experience for everyone by providing a data-driven tool that’s more interactive,  inclusive, and transparent.
        </p>
      </div>
      <div className="aboutDiv7 aboutDivShared">
        <p className="aboutBody">
          For example, in these challenging COVID 19 times, we are mapping donors who are donating food rations, PPE (Personal Protective Equipment), cash, and clothes to people who need them. Volunteers can use this information and engage with the action and provide support. By mapping volunteer locations, MC can help with disaster management and mitigate issues before they become issues.
        </p>
      </div>
      <div className="aboutDiv8 aboutDivShared">
        <p className="aboutBody">
          While MC will initially be piloted in Pakistan, we plan to scale to countries interested in mobilising their citizens for collective action.
        </p>
      </div>
      <div className="aboutDiv9 aboutDivShared">
        <p className="aboutBody">
          We’re ready to help you help others. Are you?
        </p>
      </div>

      <hr className="seperator" />

      <div className="aboutLogo">
        <h4 className="aboutOurPartners" > Our Partners </h4>
        <div className="logoRow">
          {/* <a href="http://akho.org.pk" target="_blank" rel="noopener noreferrer"><img className="logoImage grow" src={akho} alt="error" /></a> */}
          <a href="https://badlde.org" target="_blank" rel="noopener noreferrer"><img className="logoImage grow" src={badlde} alt="error" /></a>
          {/* <a href="http://serendip.tv" target="_blank" rel="noopener noreferrer"><img className="logoImage grow" src={serendip} alt="error" /></a> */}
        </div>
      </div>

      <div className="aboutBottomSpace" />

    </div>
  )
}



export default About