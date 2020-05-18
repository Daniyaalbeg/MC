import React from 'react'

const createStarRing = (ring1, ring2, ring3, ring4, ring5, star) => {
  const ring1C = '#2B495D'
  const ring1CG = '#4C5962'
  const ring1O = ring1 ? 1 : 0.25
  const ring2C = '#F5A26A'
  const ring2CG = '#F47E2E'
  const ring2O = ring2 ? 1 : 0.25
  const ring3C = '#F4DB68'
  const ring3CG = '#FFD71A'
  const ring3O = ring3 ? 1 : 0.25
  const ring4C = '#7EAF81'
  const ring4CG = '#4BB250'
  const ring4O = ring4 ? 1 : 0.25
  const ring5C = '#66A0BF'
  const ring5CG = '#1589C9'
  const ring5O = ring5 ? 1 : 0.25
  const starC ='#E75C5F'
  const starCG ='#EF2A30'
  const starO = star ? 1 : 0.25

  const starSVG = (
      <svg className="starRing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" height="200" width="200">
        <defs>
          <radialGradient id="c1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color={ring1C} />
            <stop offset="100%" stop-color={ring1CG} />
          </radialGradient>
          <radialGradient id="c2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color={ring2C} />
            <stop offset="100%" stop-color={ring2CG} />
          </radialGradient>
          <radialGradient id="c3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color={ring3C} />
            <stop offset="100%" stop-color={ring3CG} />
          </radialGradient>
          <radialGradient id="c4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color={ring4C} />
            <stop offset="100%" stop-color={ring4CG} />
          </radialGradient>
          <radialGradient id="c5" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color={ring5C} />
            <stop offset="100%" stop-color={ring5CG} />
          </radialGradient>
          <radialGradient id="starG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color={starC} />
            <stop offset="100%" stop-color={starCG} />
          </radialGradient>
        </defs>
        <circle stroke="url(#c1)" stroke-opacity={ring1O} cx="50" cy="50" r="30" stroke-dasharray="30 170" stroke-width="12" fill="none" stroke-linecap="butt" transform="rotate(0, 50, 50)"/>
        <circle stroke="url(#c2)" stroke-opacity={ring2O} cx="50" cy="50" r="30" stroke-dasharray="30 170" stroke-width="12" fill="none" stroke-linecap="butt" transform="rotate(75, 50, 50)"/>
        <circle stroke="url(#c3)" stroke-opacity={ring3O} cx="50" cy="50" r="30" stroke-dasharray="30 170" stroke-width="12" fill="none" stroke-linecap="butt" transform="rotate(145, 50, 50)"/>
        <circle stroke="url(#c4)" stroke-opacity={ring4O} cx="50" cy="50" r="30" stroke-dasharray="30 170" stroke-width="12" fill="none" stroke-linecap="butt" transform="rotate(215, 50, 50)"/>
        <circle stroke="url(#c5)" stroke-opacity={ring5O} cx="50" cy="50" r="30" stroke-dasharray="30 170" stroke-width="12" fill="none" stroke-linecap="butt" transform="rotate(285, 50, 50)"/>
        <path fill="url(#starG)" fill-opacity={starO} d="
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