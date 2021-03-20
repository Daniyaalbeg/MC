import React from "react";

const VolunteerRequestCard = ({ request, setSelectedRequest }) => {
  return (
    <div
      className="group h-60 w-48 relative overflow-hidden rounded-2xl shadow-solid hover:shadow transition transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
      onClick={() => setSelectedRequest(request)}
    >
      <h5 className="absolute text-white font-bold bottom-4 left-4 z-20 transition transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
        {request.requestedProject.name}
      </h5>
      <div className="absolute top-0 left-0 h-60 w-48 bg-gradient-to-t from-black via-transparent opacity-50 z-10"></div>
      <img
        className="object-cover transition transform duration-500 scale-105 group-hover:scale-100 group-hover:-translate-y-2"
        src={request.requestedProject.images[0]}
      />
    </div>
  );
};

export default VolunteerRequestCard;
