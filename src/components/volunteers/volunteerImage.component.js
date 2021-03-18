import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/pro-solid-svg-icons";

const ImageComponent = ({ user, image, size }) => {
  let imageComponent = null;
  let scale = null;
  if (size === "large") {
    scale = "h-32 w-32 sm:h-48 sm:w-48 ";
  } else {
    scale = "h-24 w-24 sm:h-32 sm:w-32 ";
  }
  if (image) {
    imageComponent = (
      <img
        className={
          scale +
          " rounded-full object-cover shadow-sm border-4 border-white border-solid"
        }
        // src={image}
        src={user.picture.large}
      />
    );
  } else {
    imageComponent = (
      <div
        className={
          scale +
          " rounded-full flex-grow overflow-hidden flex items-center justify-center border-4 border-white border-solid bg-gray-700"
        }
      >
        <FontAwesomeIcon
          // className="shadow-lg"
          icon={faUserAlt}
          size={size === "large" ? "4x" : "2x"}
          color="white"
        />
      </div>
    );
  }

  return imageComponent;
};

export default ImageComponent;
