import React, { createRef } from 'react';
import { Polygon } from '@react-google-maps/api';

const polyOptions = {
  fillColor: "#4c59623f",
  strokeColor: "#4C5962",
  strokeOpacity: 0.5,
  strokeWeight: 1,
  clickable: true,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
}

const nationalPolyOptions = {
  fillColor: "#4c59623f",
  strokeColor: "#4C5962",
  strokeOpacity: 0.5,
  strokeWeight: 1,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 0
}

const createPolygon = (feature, setShowInfo, mapBounds) => {

  if (feature.geometry === undefined || feature.geometry.coordinates === undefined) {
    return null
  }
  if (!mapBounds || !mapBounds.contains({ lat: feature.geometry.averageLatLng.lat, lng: feature.geometry.averageLatLng.lng })) {
    return null
  }

  const polyRef = createRef()

  return <Polygon
    ref={polyRef}
    onMouseOut={() => {
      polyRef.current.state.polygon.setOptions({fillColor: "#4c59623f"});
    }}
    onMouseMove={() => {
      polyRef.current.state.polygon.setOptions({fillColor: "#444444"});
    }}
    onClick={(e) => {
      setShowInfo({ "feature": feature, latLng: e.latLng })
    }}
    key={feature.id}
    paths={feature.geometry.coordinates}
    options={polyOptions}
  />
}

const createNationalPolygon = (feature) => {
  if (feature.geometry === undefined || feature.geometry.coordinates === undefined) {
    return null
  }

  return <Polygon
    key={feature.id}
    paths={feature.geometry.coordinates}
    options={nationalPolyOptions}
  />
}

export default createPolygon

export {
  createNationalPolygon
}