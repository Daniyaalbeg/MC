import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Spinner } from 'react-bootstrap';

import { getGroups } from '../../Actions/groupActions';
import getRandomColour from '../utilities/randomMCColour.component';
import { LightenDarkenColor } from '../utilities/colourUtils';
import { GroupModal } from '../groups/groupModal.component';

import GroupCard from './groupCard.component';

const GroupView = ({ dispatch, loading, fetched, hasErrors, groups }) => {
  useEffect(() => {
    if (!loading && !fetched) {
      dispatch(getGroups())
    }
  })

  return (
    <>
    <Helmet>
      <html lang="en" />
      <meta name="description" content="A list of groups that a user can join" />
    </Helmet>
    <div className="groupMainContainer">
      <h1> Groups </h1>
      <p> Select the whatsapp group that you would like to join. Click on the link and contribute. </p>
      <FilterBar />
      <Groups groups={groups} hasErrors={hasErrors} loading={loading} />
    </div>
    </>
  )
}

const FilterBar = ({  }) => {
  return (
    null
  )
}

const Groups = ({ groups, loading, hasErrors }) => {
  const [selectedGroup, setSelectedGroup] = useState(null)

  if (loading) {
    return (
      <div className="spinnerThing">
				<Spinner animation="border" role="status" style={{color: "black"}}>
					<span className="sr-only">Loading...</span>
				</Spinner>
			</div>
    )
  }

  if (hasErrors) {
    return (
      null
    )
  }

  return (
    <>
    <div className="groupMainCardsContainer">
      {groups.map((group) => {
        const randomColour = getRandomColour()
        return (
          <>
          <div key={group._id} className="groupCard groupCardShadow growSmall" onClick={() => setSelectedGroup(group)} >
            <GroupCard group={group} />
          </div>
          </>
        )
      })}
    </div>
    {selectedGroup &&
      <GroupModal group={selectedGroup} setSelectedGroup={setSelectedGroup} />
    }
    </>
  )
}

const MapStateToProps = (state) => ({
  loading: state.groupInfo.groupData.loading,
  hasErrors: state.groupInfo.groupData.hasErrors,
  fetched: state.groupInfo.groupData.fetched,
  groups: state.groupInfo.groupData.groups,
})

export default connect(MapStateToProps)(GroupView)