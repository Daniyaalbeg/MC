import React from 'react'
import { useTabState } from '@bumaga/tabs'


export const Tab = ({ children, addClass }) => {
  const { isActive, onClick } = useTabState()
  const cn = (...args) => args.filter(Boolean).join(' ')

  return (
    <button className={cn('tab', isActive && 'active') + ' icon ' + cn(addClass, isActive && 'active')} onClick={onClick}>
      {children}
    </button>
  )
}