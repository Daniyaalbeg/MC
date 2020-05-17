import React from 'react'

const createStarRing = (ring1, ring2, ring3, ring4, ring5, star) => {
  const ring1C = '#4C5962'
  const ring1O = ring1 ? 1 : 0.25
  const ring2C = '#F47E2E'
  const ring2O = ring2 ? 1 : 0.25
  const ring3C = '#FFD71A'
  const ring3O = ring3 ? 1 : 0.25
  const ring4C = '#4BB250'
  const ring4O = ring4 ? 1 : 0.25
  const ring5C = '#1589C9'
  const ring5O = ring5 ? 1 : 0.25
  const starC ='#EF2A30'
  const starO = star ? 1 : 0.25

  const starSVG = (
      <svg className="starRing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" height="200" width="200">
      <circle stroke={ring1C} stroke-opacity={ring1O} cx="50" cy="50" r="30" stroke-dasharray="30 170" stroke-width="12" fill="none" stroke-linecap="butt" transform="rotate(0, 50, 50)"/>
      <circle stroke={ring2C} stroke-opacity={ring2O} cx="50" cy="50" r="30" stroke-dasharray="30 170" stroke-width="12" fill="none" stroke-linecap="butt" transform="rotate(75, 50, 50)"/>
      <circle stroke={ring3C} stroke-opacity={ring3O} cx="50" cy="50" r="30" stroke-dasharray="30 170" stroke-width="12" fill="none" stroke-linecap="butt" transform="rotate(145, 50, 50)"/>
      <circle stroke={ring4C} stroke-opacity={ring4O} cx="50" cy="50" r="30" stroke-dasharray="30 170" stroke-width="12" fill="none" stroke-linecap="butt" transform="rotate(215, 50, 50)"/>
      <circle stroke={ring5C} stroke-opacity={ring5O} cx="50" cy="50" r="30" stroke-dasharray="30 170" stroke-width="12" fill="none" stroke-linecap="butt" transform="rotate(285, 50, 50)"/>
      <path fill={starC} fill-opacity={starO} d="
        M 50.000 60.000
        L 61.756 66.180
        L 59.511 53.090
        L 69.021 43.820
        L 55.878 41.910
        L 50.000 30.000
        L 44.122 41.910
        L 30.979 43.820
        L 40.489 53.090
        L 38.244 66.180
        L 50.000 60.000
        " stroke-linejoin="round"/>
    </svg>
  )
  return starSVG
}

export default createStarRing