import React, { useState, useEffect, useCallback } from 'react';


import ProjectSupplies from './supplyTab/projectSupplies.component';
import ProjectInfoTab from './projectInfoTab.component';
import ProjectFunding from './fundingTab/projectFunding.component';
import FaqTab from './faqTab/faqTab.component';
import UpdateTab from './updateTab/updateTab.component';
import PublishButton from './publishButton.component';
import { Tabs, Panel } from '@bumaga/tabs';
import { Tab } from '../../utilities/tabComponent';

import { selectProjectDash, selectProjectDashSupply } from '../../../Actions/projectActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/pro-solid-svg-icons'
import { useDispatch } from 'react-redux';

const SelectedProjectView = ({ project }) => {
  const dispatch = useDispatch()
  const [pageTitle, setPageTitle] = useState('Project Info')

  useEffect(() => {
    return function() {
      dispatch(selectProjectDash(null))
      dispatch(selectProjectDashSupply(null))
    }
  }, [])

  return (
    <>
      <div className="headerButtonsContainer">
          <button className="standardButtonWithoutColour mcGreenBG" onClick={() => dispatch(selectProjectDash(null))}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
          <PublishButton project={project} />
          {pageTitle &&
            <h3 style={{display: 'none'}}> {project.name} </h3>
          }
      </div>
      <Tabs>
        <div className="projectViewMinorContainer">
          <div className="projectTabBar">
            <div className="projectTabs">
              <Tab tabType="projectTab" passedOnClick={() => setPageTitle('Project Info')}>
                <p> Project Info </p>
              </Tab>
              <Tab tabType="projectTab" passedOnClick={() => setPageTitle('Project Funding')}>
                <p> Funding </p>
              </Tab>
              <Tab tabType="projectTab" passedOnClick={() => setPageTitle('Project Supplies')}>
                <p> Supplies </p>
              </Tab>
              <Tab tabType="projectTab" passedOnClick={() => setPageTitle('Project Volunteers')}>
                <p> Volunteers </p>
              </Tab>
              <Tab tabType="projectTab" passedOnClick={() => setPageTitle('Project FAQ')}>
                <p> FAQ </p>
              </Tab>
              <Tab tabType="projectTab" passedOnClick={() => setPageTitle('Project Updates')}>
                <p> Updates </p>
              </Tab>
            </div>
          </div>
          <div className="projectTabContent">
            <Panel>
              <ProjectInfoTab project={project} />
            </Panel>
            <Panel>
              <div className="emptyDBContainer"> <p className="comingSoonText"> Coming Soon </p> </div>
              {/* <ProjectFunding project={project} /> */}
            </Panel>
            <Panel>
              <ProjectSupplies project={project} />
            </Panel>
            <Panel>
              <div className="emptyDBContainer"> <p className="comingSoonText"> Coming Soon </p> </div>
            </Panel>
            <Panel>
              <FaqTab project={project} />
            </Panel>
            <Panel>
              <UpdateTab project={project} />
            </Panel>
          </div>
        </div>
      </Tabs>
    </>
  )
}

export default SelectedProjectView