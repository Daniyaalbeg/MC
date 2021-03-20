import React, { useState } from "react";
import UserImagePlaceholder from "../../sharedComponents/userImagePlaceholder.component";
import { WhatCategories } from "../../iconController/iconCategories.component";
import VolunteerPillsList from "../../volunteers/volunteerPillsList.component";
import VolunteerIconInfo from "../../volunteers/volunteerIconInfo.component";
import VolunteerPersonalIconInfo from "../../volunteers/volunteerPersonalIconInfo.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faChevronCircleUp } from "@fortawesome/pro-duotone-svg-icons";

const VolunteerProfile = ({ volunteer }) => {
  const [expanded, setExpanded] = useState();

  return (
    <>
      <div className="volunteerCard">
        <div className="volunteerProfile">
          <div className="volunteerProfileA">
            <UserImagePlaceholder image={volunteer.image} />
            <p>
              {" "}
              {volunteer.firstName} {volunteer.lastName}{" "}
            </p>
          </div>
          <div className="volunteerProfileB">
            <h6 className="font-bold text-gray-700">My Causes</h6>
            <div>
              <WhatCategories types={volunteer.interests} />
            </div>
          </div>
          <div className="volunteerProfileC">
            <h6 className="font-bold text-gray-700">My Skills</h6>
            <VolunteerPillsList size="small" items={volunteer.skills} />
          </div>
          <div className="volunteerProfileButtons">
            <button>
              {" "}
              <FontAwesomeIcon icon={faEdit} />{" "}
            </button>
          </div>
        </div>
        <div className="w-full py-4 text-center">
          <button onClick={() => setExpanded((expanded) => !expanded)}>
            {" "}
            <FontAwesomeIcon
              icon={faChevronCircleUp}
              style={{
                transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
              }}
              size="2x"
            />{" "}
          </button>
        </div>
        {expanded && <VolunteerProfileInfo volunteer={volunteer} />}
      </div>
    </>
  );
};

const VolunteerProfileInfo = ({ volunteer }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-2 px-4">
      <div className="col-span-2 sm:col-span-1">
        <h6 className="m-0 font-bold text-gray-500">Email</h6>
        <p className="mb-1">{volunteer.email}</p>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <h6 className="m-0 font-bold text-gray-500">Tagline</h6>
        <p className="mb-1">{volunteer.tagLine ? volunteer.tagLine : "-"}</p>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <h6 className="m-0 font-bold text-gray-500">About Me</h6>
        <p className="mb-1">{volunteer.about ? volunteer.about : "-"}</p>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <h6 className="m-0 font-bold text-gray-500">CNIC</h6>
        <p className="mb-1">{volunteer.cnic ? volunteer.cnic : "-"}</p>
      </div>

      <div className="mb-1 col-span-2 sm:col-span-1">
        <VolunteerPersonalIconInfo volunteer={volunteer} />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <h6 className="m-0 font-bold text-gray-500">Contact Number</h6>
        <p className="mb-1">
          {volunteer.contactNumber ? volunteer.contactNumber : "-"}
        </p>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <VolunteerIconInfo volunteer={volunteer} />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <h6 className="m-0 font-bold text-gray-500">Preferred Contact</h6>
        <p className="mb-1">
          {volunteer.preferredContact ? volunteer.preferredContact : "-"}
        </p>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <h6 className="mb-2 font-bold text-gray-500">Languages</h6>
        <VolunteerPillsList size="small" items={volunteer.languages} />
      </div>
    </div>
  );
};

export default VolunteerProfile;
