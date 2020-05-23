import React from 'react'
import { useTabState } from '@bumaga/tabs'


export const Tab = ({ children }) => {
  const { isActive, onClick } = useTabState()
  const cn = (...args) => args.filter(Boolean).join(' ')

  return (
    <button className={cn('tab', isActive && 'active') + ' icon'} onClick={onClick}>
      {children}
    </button>
  )
}