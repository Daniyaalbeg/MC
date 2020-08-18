import React from 'react'
import { useTabState } from '@bumaga/tabs'


export const Tab = ({ children, tabType, addClass, passedOnClick }) => {
  const { isActive, onClick } = useTabState()
  const cn = (...args) => args.filter(Boolean).join(' ')

  return (
    <button className={cn(tabType, isActive && 'active') + ' icon ' + cn(addClass, isActive && 'active')} onClick={() => {
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