import React, { useState } from 'react';
import { Helmet } from 'react-helmet'
// import { FacebookShareButton, FacebookIcon } from 'react-share'

import image1 from '../../assets/video/placeholder/1.jpg';
import image2 from '../../assets/video/placeholder/2.jpg';
import image3 from '../../assets/video/placeholder/3.jpg';
import image4 from '../../assets/video/placeholder/4.jpg';
import image5 from '../../assets/video/placeholder/5.jpg';
import image6 from '../../assets/video/placeholder/6.jpg';
import image7 from '../../assets/video/placeholder/7.jpg';
import { CLIENT, production, rootURL } from '../../config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/pro-solid-svg-icons'


const videos = [
  {
    id: 1,
    name: "A Day with Edhi and Bilquis 1998",
    player: "https://player.vimeo.com/video/173005741",
    url: "https://vimeo.com/173005741",
    image: image1
  },
  {
    id: 2,
    name: "Haider Ali Un-Disabled",
    player: "https://player.vimeo.com/video/158591533",
    url: "https://vimeo.com/158591533",
    image: image2
  },
  {
    id: 3,
    name: "Sajda's Sewing Dream",
    player: "https://player.vimeo.com/video/146986299",
    url: "https://vimeo.com/146986299",
    image: image3
  },
  {
    id: 4,
    name: "Zafar Makes Energy",
    player: "https://player.vimeo.com/video/147007246",
    url: "https://vimeo.com/147007246",
    image: image4
  },
  {
    id: 5,
    name: "Fehmida Rises Up",
    player: "https://player.vimeo.com/video/174172199",
    url: "https://vimeo.com/174172199",
    image: image5
  },
  {
    id: 6,
    name: "Mehnaz - Leadership Personified",
    player: "https://player.vimeo.com/video/167070054",
    url: "https://vimeo.com/167070054",
    image: image6
  },
  {
    id: 7,
    name: "Edhi's Story - Nawrang 1991",
    player: "https://player.vimeo.com/video/170451406",
    url: "https://vimeo.com/170451406",
    image: image7
  },
]

const InspireView = (props) => {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [searched, setSearched] = useState(null)
  const videoId = parseInt(props.match.params.id)

  if (videoId && !selectedVideo && !searched) {
    setSelectedVideo(findVideo(videoId))
    setSearched(true)
  }

  return (
    <>
    <div className="inspireContainer">
      <div className="inspireHeader">
        <h1> Inspiration in Motion </h1>
        <p> Successful people who changed their fate and supported others around them </p>
      </div>
      <div className="inspireContent">
        <div className="inspireCardContainer">
          <InspireVideoCards setSelectedVideo={setSelectedVideo} />
        </div>
      </div>
    </div>
    {selectedVideo &&
      <VideoModal selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} />
    }
    </>
  )
}

const findVideo = (id) => {
  for (var i = 0; i < videos.length; i++) {
    console.log(id)
    console.log(videos[i].id)
    if (videos[i].id === id) {
      return videos[i]
    }
  }
  return null
}

const copyText = (text) => {

}

const VideoModal = ({ selectedVideo, setSelectedVideo }) => {
  const [copiedLink, setCopiedLink] = useState(false)

  return (
    <div className="videoModalBackground" onClick={() => setSelectedVideo(null)}>
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={selectedVideo.name} />
        <meta property="og:description" content="Watch their story" />
        <meta property="og:image" content={selectedVideo.image} />
        {/* <meta property="og:image:width" content="400" /> */}
        {/* <meta property="og:image:height" content="400" /> */}
      </Helmet>
      <div className="videoModal" onClick={(e) => e.stopPropagation()}>
      <FontAwesomeIcon icon={faTimesCircle} size="2x" className="modalCloseButton" onClick={() => setSelectedVideo(null)} />

        <div className="videoModalTitle">
          <h1> {selectedVideo.name} </h1>
        </div>
        <div className="videoModalVideo">
          <iframe src={selectedVideo.player} allowFullScreen frameBorder="0"></iframe>
        </div>
        <div className="linkCopyButtonVideoModal">
          <button className="standardButton" onClick={() => {
            navigator.clipboard.writeText(rootURL(production) + CLIENT + '/inspire/' + selectedVideo.id)
            setCopiedLink(true)
          }}> {copiedLink ? "Copied link": "Copy link"} </button>
          {/* <FacebookShareButton
            url={rootURL(true) + "ministryofchange.org" + '/inspire/' + selectedVideo.id}
            quote={selectedVideo.name}
            hashtag="#inspire #mc #ministryofchange"
          >
            <FacebookIcon size={36} round={true} />
          </FacebookShareButton> */}
        </div>
      </div>
    </div>
  )
}

const InspireVideoCards = ({ setSelectedVideo }) => {
  return videos.map((video) => {
    return <VideoCard key={video.name} video={video} setSelectedVideo={setSelectedVideo} />
  })
}

const VideoCard = ({ video, setSelectedVideo }) => {

  return (
    <div className="videoCard grow" onClick={(e) => {
      e.stopPropagation()
      setSelectedVideo(video)
    }}>
      <div className="videoCardVideoContainer">
        {/* <iframe src={video.player} allowFullScreen frameBorder="0"></iframe> */}
        <img src={video.image} alt="Video placeholder" />
      </div>
      <div className="videoCardBottom">
        {/* <a href={video.url}> {video.name} </a> */}
        <p> {video.name} </p>
      </div>
    </div>
  )
}

export default InspireView