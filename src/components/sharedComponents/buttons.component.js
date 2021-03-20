import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/pro-solid-svg-icons";

const Button = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-800 font-bold text-white"
    >
      {title}
    </button>
  );
};

const BackButton = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white"
    >
      <FontAwesomeIcon className="mr-2" icon={faChevronCircleLeft} />
      {title}
    </button>
  );
};

export { Button, BackButton };
