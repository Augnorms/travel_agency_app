import React from 'react'
import EventBanner from '@/components/event/eventBanner'
import ImageDisplay from '@/components/event/imageDisplay'
import EventNotify from '@/components/event/eventNotify'

export default function page() {
  return (
    <div>
        <EventBanner />
        <EventNotify />
        <ImageDisplay />
    </div>
  )
}
