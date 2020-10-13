import React from 'react'
import { Tab } from '../utilities/tabComponent';
import { Tabs, Panel } from '@bumaga/tabs'

import ProjectInfoPanel from './projectTabPanels/infoPanel.component';
import ProjectFundingPanel from './projectTabPanels/fundingPanel.component';
import ProjectSuppliesPanel from './projectTabPanels/suppliesPanel.component';
import ProjectCommentsPanel from './projectTabPanels/commentsPanel/commentsPanel.component';
import ProjectUpdatesPanel from './projectTabPanels/updatesPanel.component';
import ProjectFaqPanel from './projectTabPanels/faqPanel.component';

const SelectedProjectInfoTabs = ({ project, activeTab, setActiveTab }) => {
  return (
    <div className="mainSelectedProjectsTabContainer">
      <Tabs state={[ activeTab, setActiveTab ]}>
        <div className="mainSelectedProjectsTabHeader ">
          <div className="mainProjectTabs">
            <Tab tabType="mainProjectTab">
              Info
            </Tab>
            {/* <Tab tabType="mainProjectTab">
              Funding
            </Tab> */}
            <Tab tabType="mainProjectTab">
              Supplies
            </Tab>
            <Tab tabType="mainProjectTab">
              Comments
            </Tab>
            <Tab tabType="mainProjectTab">
              Updates
            </Tab>
            <Tab tabType="mainProjectTab">
              FAQ
            </Tab>
          </div>
        </div>
        <div className="mainSelectedProjectsTabBody">
          <Panel>
            <ProjectInfoPanel project={project} />
          </Panel>
          {/* <Panel>
            <ProjectFundingPanel project={project} />
          </Panel> */}
          <Panel>
            <ProjectSuppliesPanel project={project} />
          </Panel>
          <Panel>
            <ProjectCommentsPanel project={project} />
          </Panel>
          <Panel>
            <ProjectUpdatesPanel project={project} />
          </Panel>
          <Panel>
            <ProjectFaqPanel project={project} />
          </Panel>
        </div>
      </Tabs>
    </div>
  )
}

export default SelectedProjectInfoTabs