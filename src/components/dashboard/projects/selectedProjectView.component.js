import React, { useState } from 'react';

import ProjectSupplies from './supplyTab/projectSupplies.component';
import ProjectInfoTab from './projectInfoTab.component';
import { Tabs, Panel } from '@bumaga/tabs';
import { Tab } from '../../utilities/tabComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/pro-solid-svg-icons'

const SelectedProjectView = ({ project, setSelectedProject }) => {
  const [pageTitle, setPageTitle] = useState('Project Info')

  return (
    <>
      <div className="headerButtonsContainerSingle">
          <button className="standardButtonWithoutColour mcGreenBG" onClick={() => setSelectedProject(null)}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
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
              <p>b</p>
            </Panel>
            <Panel>
              <ProjectSupplies project={project} />
            </Panel>
            <Panel>
              <p>d</p>
            </Panel>
            <Panel>
              <p>e</p>
            </Panel>
            <Panel>
              <p>f</p>
            </Panel>
          </div>
        </div>
      </Tabs>
    </>
  )
}

export default SelectedProjectView