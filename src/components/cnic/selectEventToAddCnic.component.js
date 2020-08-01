import React from 'react';

import { selectCnicEvent, uploadCnicReset } from '../../Actions/cnicActions';
import getRandomColour from '../utilities/randomMCColour.component'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/pro-duotone-svg-icons';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'


const SelectEventToAddCnic = ({ dispatch, org, setSelectedOrg }) => {

 return (
   <>
     <h4> Choose a distribution to add CNIC numbers for </h4>
     <button className="standardButton" onClick={() => setSelectedOrg(null)}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
     <div className="cnicEventsList">
     {
       org.events.map((event) => {
         return (
           <div key={event._id}>
             <div className="cnicEvent">
               <p className="cnicItemText"> {event.name} </p>
               <button className="cnicItemButton" variant="secondary" onClick={() => {
                 dispatch(selectCnicEvent(event))
                 dispatch(uploadCnicReset())
               }
               }>
                 <FontAwesomeIcon icon={faPlusCircle} size="2x" swapOpacity style={{"--fa-secondary-opacity": 0, color: getRandomColour() }} className="faSelectEventButton" />
               </button>
             </div>
           </div>
         )
       })
     }
     </div>
   </>
 )
}

export default SelectEventToAddCnic