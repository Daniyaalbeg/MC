import React from 'react';
import { changeMapMode } from '../../Actions/mapSelectActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const ChangeMapModeButton = () => {
  const dispatch = useDispatch()
  const mapMode = useSelector(state => state.mapInfo.mapActions.mapMode, shallowEqual)

  return (
    <div className="mapModeButton">
      <button className={"standardButtonWithoutColour" + (mapMode === "PROJECTS" ? " active" : "")} onClick={() => {
        dispatch(changeMapMode("PROJECTS"))
      }}> Projects </button>
      <button className={"standardButtonWithoutColour"  + (mapMode === "EVENTS" ? " active" : "")} onClick={() => {
        dispatch(changeMapMode("EVENTS"))
      }}> Rations </button>
    </div>
  )

}

export default ChangeMapModeButton