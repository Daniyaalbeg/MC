import React from 'react'
import { useTabState } from '@bumaga/tabs'


export const TabDashboard = ({ children, addClass }) => {
  const { isActive, onClick } = useTabState()
  const cn = (...args) => args.filter(Boolean).join(' ')

  return (
    <button className={cn('tab', isActive && 'active') + ' icon ' + cn(addClass, isActive && 'active')} onClick={onClick}>
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