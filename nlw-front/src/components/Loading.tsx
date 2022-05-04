import { CircleNotch } from 'phosphor-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex items-center justify-center overflow-hidden'>
        <CircleNotch weight='bold' className='w-6 h-6 animate-spin'/>
    </div>
  )
}
