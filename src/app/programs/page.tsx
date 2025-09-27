import React from 'react'
import ProgramsBanner from '@/components/programsBanner'
import ProgramsOffering from '@/components/programsOffering'
import Transparent from '@/components/transparent'
import CoreDuties from '@/components/programsCoreDuty'

export default function page() {
  return (
    <div>
       <div className="relative z-10">
         <ProgramsBanner />
         <Transparent />
         <ProgramsOffering />
         <CoreDuties />
       </div>
    </div>
  )
}
