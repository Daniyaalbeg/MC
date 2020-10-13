import React, { useEffect, createRef, useRef } from 'react'
import { useTabState } from '@bumaga/tabs'


export const Tab = ({ children, tabType, addClass, passedOnClick }) => {
  const { isActive, onClick } = useTabState()
  const cn = (...args) => args.filter(Boolean).join(' ')
  const ref = createRef()
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      window.scrollTo(0, ref.current.offsetTop - 10)
    } else {
      isMounted.current = true;
    }
  }, [isActive])

  return (
    <button ref={ref} className={cn(tabType, isActive && 'active') + ' icon ' + cn(addClass, isActive && 'active')} onClick={() => {
      onClick()
      if (passedOnClick) passedOnClick()
     }}>
      {children}
    </button>
  )
}

export const TabCnic = ({ children }) => {
  const { isActive, onClick } = useTabState()
  const cn = (...args) => args.filter(Boolean).join(' ')

  return (
    <button className={cn('cnicTab', isActive && 'active') + ' icon '} onClick={onClick}>
      {children}
    </button>
  )
}