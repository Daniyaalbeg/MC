import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import HeaderIcons from "../HeaderIcons.component";
import StandardCard from "../../sharedComponents/standardCard.component";
import { ConnectedGroupModalDashboard } from "../../groups/groupModal.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/pro-duotone-svg-icons";
import { faUsers } from "@fortawesome/pro-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const GroupInfoView = ({ createdGroupsDict, createdGroupsIds }) => {
  return (
    <div className="groupContainer">
      <div className="groupHeader">
        <div className="groupTextIcon">
          <FontAwesomeIcon icon={faUsers} />
          <p> Groups - Whatsapp </p>
        </div>
        <HeaderIcons />
      </div>
      <div className="groupContent">
        <IsGroupEmpty
          createdGroupsDict={createdGroupsDict}
          createdGroupsIds={createdGroupsIds}
        />
      </div>
    </div>
  );
};

const Groups = ({ createdGroupsDict, createdGroupsIds }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const groups = createdGroupsIds.map((id) => createdGroupsDict[id]);

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Link to="createGroup">
          <button className="standardButtonWithoutColour mcBlueBG">
            {" "}
            <FontAwesomeIcon
              icon={faPlus}
              style={{ marginRight: "0.3em" }}
            />{" "}
            Create Group{" "}
          </button>
        </Link>
      </div>
      <div className="groupCardContainer">
        {groups.map((group) => {
          return (
            <div
              key={group._id}
              className="groupCard growSmall"
              style={{ backgroundColor: "#1589C9" }}
              onClick={() => setSelectedGroup(group)}
            >
              <StandardCard name={group.groupName} image={group.imageName} />
            </div>
          );
        })}
      </div>
      {selectedGroup && (
        <ConnectedGroupModalDashboard
          group={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      )}
    </>
  );
};

const IsGroupEmpty = ({ createdGroupsDict, createdGroupsIds }) => {
  if (createdGroupsIds && createdGroupsIds.length === 0) {
    return (
      <div className="emptyDBContainer">
        <p>
          {" "}
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="cnicExclamationIcon"
          />{" "}
          You have not created any groups yet.{" "}
        </p>
        <Link to="createGroup">
          <button className="createGroupButton standardButton">
            {" "}
            <FontAwesomeIcon
              icon={faPlus}
              style={{ marginRight: "0.3em" }}
            />{" "}
            Create Group{" "}
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <Groups
        createdGroupsDict={createdGroupsDict}
        createdGroupsIds={createdGroupsIds}
      />
    );
  }
};

const MapStateToProps = (state) => ({
  createdGroupsDict: state.userInfo.createdGroups,
  createdGroupsIds: state.userInfo.entityIds.createdGroups,
});

export default connect(MapStateToProps)(GroupInfoView);
