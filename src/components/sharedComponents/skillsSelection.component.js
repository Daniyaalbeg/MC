import React, { useState, useRef } from 'react';
import { listOfSkills } from '../utilities/skillOptions.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as faRegularCheckCircle } from '@fortawesome/pro-regular-svg-icons';

const SkillsSelection = ({ selectedSkills, setFieldValue }) => {
  
  return (
    <div className="skills-selection-container">
      <div className="skills-selection-top">

      </div>
      <div className="skills-selection-bottom">
        {
          listOfSkills.map((skillsCategory) => {
            return (
              <Accordion key={skillsCategory.title} title={skillsCategory.title}>
                {
                  skillsCategory.skills.map((skill) => {
                    return <SelectSkillItem key={skill} skill={skill} selectedSkills={selectedSkills} setFieldValue={setFieldValue} />
                  })
                }
              </Accordion>
            )
          })
        }
      </div>
    </div>
  )
}

const SelectSkillItem = ({ skill, selectedSkills, setFieldValue }) => {

  const toggleItem = () => {
    const index = selectedSkills.indexOf(skill)
    const array = [...selectedSkills]
    if (index === -1) {
      array.push(skill)
    } else {
      array.splice(index, 1)
    }
    
    setFieldValue("skills", array)
  }

  return (
    <div className="select-skill-container">
      <FontAwesomeIcon icon={selectedSkills.includes(skill) ? faCheckCircle : faRegularCheckCircle} />
      <p onClick={toggleItem}> {skill} </p>
    </div>
  )
}

const Accordion = ({ title, children }) => {
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState(0)

  const content = useRef(null)

  const toggleAccordion = () => {
    setActive(!active)
    setHeight( active ? "0px": `${content.current.scrollHeight}px` )
  }

  return (
    <div className="accordion-container">
      <div className="accordion-title" onClick={toggleAccordion}>
        <p> {title} </p>
        <FontAwesomeIcon icon={faChevronCircleDown} rotation={active ? 180 : null} />
      </div>
      <div ref={content} style={{ maxHeight: height }} className={active ? "accordion-content active" : "accordion-content"}>
        {children}
      </div>
    </div>
  )
}

export default SkillsSelection