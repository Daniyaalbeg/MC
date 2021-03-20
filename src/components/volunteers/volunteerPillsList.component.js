import React from "react";

const VolunteerPillsList = ({ items, size = "large" }) => {
  if (!items) return <p> Nothing available </p>;
  let utilsPill = "px-3 py-2";
  let parentUtil = "gap-2";
  if (size === "small") {
    utilsPill = "px-3 py-1 text-sm";
    parentUtil = "gap-1";
  }
  return (
    <div className={parentUtil + " flex flex-row flex-wrap"}>
      {items.map((item) => {
        return (
          <p
            key={item}
            className={
              utilsPill +
              " m-0 rounded-full transition-all transform hover:scale-105 bg-gray-700 hover:bg-gray-800 duration-500 ease-in-out text-white font-bold"
            }
          >
            {" "}
            {item}{" "}
          </p>
        );
      })}
    </div>
  );
};

export default VolunteerPillsList;
