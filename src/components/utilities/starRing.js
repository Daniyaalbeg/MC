import React from 'react'

const createStarRing = (ring1, ring2, ring3, ring4, ring5, star) => {
  const ring1C = '#f5f5f5'
  const ring1CG = '#f5f5f5'
  const ring1O = ring1 ? 1 : 0.4
  const ring2C = '#F5A26A'
  const ring2CG = '#F47E2E'
  const ring2O = ring2 ? 1 : 0.4
  const ring3C = '#F4DB68'
  const ring3CG = '#FFD71A'
  const ring3O = ring3 ? 1 : 0.4
  const ring4C = '#7EAF81'
  const ring4CG = '#4BB250'
  const ring4O = ring4 ? 1 : 0.4
  const ring5C = '#66A0BF'
  const ring5CG = '#1589C9'
  const ring5O = ring5 ? 1 : 0.4
  const starC ='#E75C5F'
  const starCG ='#EF2A30'
  const starO = star ? 1 : 0.4

  const starSVG = (
      <svg className="starRing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" height="200" width="200">
        <defs>
          <radialGradient id="c1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ring1C} />
            <stop offset="100%" stopColor={ring1CG} />
          </radialGradient>
          <radialGradient id="c2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ring2C} />
            <stop offset="100%" stopColor={ring2CG} />
          </radialGradient>
          <radialGradient id="c3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ring3C} />
            <stop offset="100%" stopColor={ring3CG} />
          </radialGradient>
          <radialGradient id="c4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ring4C} />
            <stop offset="100%" stopColor={ring4CG} />
          </radialGradient>
          <radialGradient id="c5" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ring5C} />
            <stop offset="100%" stopColor={ring5CG} />
          </radialGradient>
          <radialGradient id="starG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={starC} />
            <stop offset="100%" stopColor={starCG} />
          </radialGradient>
        </defs>
        <circle stroke="url(#c1)" strokeOpacity={ring1O} cx="50" cy="50" r="30" strokeDasharray="30 170" strokeWidth="12" fill="none" strokeLinecap="butt" transform="rotate(0, 50, 50)"/>
        <circle stroke="url(#c2)" strokeOpacity={ring2O} cx="50" cy="50" r="30" strokeDasharray="30 170" strokeWidth="12" fill="none" strokeLinecap="butt" transform="rotate(75, 50, 50)"/>
        <circle stroke="url(#c3)" strokeOpacity={ring3O} cx="50" cy="50" r="30" strokeDasharray="30 170" strokeWidth="12" fill="none" strokeLinecap="butt" transform="rotate(145, 50, 50)"/>
        <circle stroke="url(#c4)" strokeOpacity={ring4O} cx="50" cy="50" r="30" strokeDasharray="30 170" strokeWidth="12" fill="none" strokeLinecap="butt" transform="rotate(215, 50, 50)"/>
        <circle stroke="url(#c5)" strokeOpacity={ring5O} cx="50" cy="50" r="30" strokeDasharray="30 170" strokeWidth="12" fill="none" strokeLinecap="butt" transform="rotate(285, 50, 50)"/>
        <path fill="url(#starG)" fillOpacity={starO} d="
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
          " strokeLinejoin="round"/>
    </svg>
  )
  return starSVG
}

export default createStarRing