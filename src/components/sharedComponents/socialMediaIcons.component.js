import React from 'react';

const SocialMediaIcons = ({ org }) => {
  const socialMediaIcons = [org.facebookURL, org.twitterURL, org.instagramURL]
  let anyIcons = false
  socialMediaIcons.forEach((socialIcon) => {
    if (socialIcon !== "") {
      anyIcons = true
    }
  });
  if (anyIcons) {
    return (
      <>
        <p className="supplierTitle"> Social media </p>
      </>
    );
  } else {
    return null
  };
}

export default SocialMediaIcons