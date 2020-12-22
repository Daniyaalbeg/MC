import React, { useState, createRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';

const MultiStringInput = ({  }) => {
  const [values, setValues] = useState([])
  const input = createRef()

  const addStringInput = (e) => {
    if (!input.current.value) return 
    e.preventDefault()
    setValues((values) => {
      const newValues = [...values]
      newValues.unshift(input.current.value)
      input.current.value = ""
      return newValues
    })
  }

  const addStringInputEnter = (e) => {
    if (e.keyCode === 13) {
      return addStringInput(e)
    }
  }

  return (
    <div className="multi-string-container">
      <div className="multi-string-input-button">
        <input ref={input} className="multi-string-input" onKeyDown={addStringInputEnter} />
        <button className="multi-string-button" type="button" onClick={addStringInput}> Add </button>
      </div>
      <div className="multi-string-values">
        {
          values.map((value, index) => {
            return (
              <div key={index} className="multi-string-value">
                <p> {value} </p>
                <FontAwesomeIcon icon={faTimes} onClick={() => {
                  setValues((values) => {
                    const newValues = [...values]
                    newValues.splice(index, 1)
                    return newValues
                  })
                }} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MultiStringInput