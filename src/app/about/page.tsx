import React from 'react'
import AboutBanner from '@/components/aboutBanner'
import Transparent from '@/components/transparent'
import AboutPartners from '@/components/aboutPartners'

export default function page() {
  return (
    <div>
      <div className="relative z-10">
        <AboutBanner />
        <Transparent show/>
        <AboutPartners />
      </div>
    </div>
  )
}
