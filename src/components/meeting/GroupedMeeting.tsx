import React, { useState } from 'react'
import { MeetingDto } from '../../dtos/MeetingDto'
import MeetingSearchResult from './MeetingSearchResult'
import { Grid2 } from '@mui/material'

export default function GroupedMeeting({ meetings }: { meetings: MeetingDto[] }) {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  const grouped = meetings.reduce((acc, m) => {
    acc[m.superId] = acc[m.superId] || []
    acc[m.superId].push(m)
    return acc
  }, {} as Record<number, MeetingDto[]>)

  Object.values(grouped).forEach(group =>
    group.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime())
  )

  const toggle = (sid: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      next.has(sid) ? next.delete(sid) : next.add(sid)
      return next
    })
  }

  return (
    <Grid2 container spacing={3} className="my-5 overflow-y-scroll">
      {Object.entries(grouped).map(([sidStr, group]) => {
        const sid = +sidStr
        const [first, ...rest] = group
        const isExp = expandedIds.has(sid)
        const isRepeat = rest.length > 0

        return (
          <React.Fragment key={sid}>
             <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>              <div className="relative">
                <MeetingSearchResult
                  meeting={first}
                  isRepeatable={isRepeat}
                  isExpanded={isExp}
                  onToggle={isRepeat ? () => toggle(sid) : undefined}
                />
              </div>
            </Grid2>

            {isExp && rest.map(m => (
              <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>                <MeetingSearchResult
                  meeting={m}
                  isRepeatable={false}
                  isExpanded={true}
                />
              </Grid2>
            ))}
          </React.Fragment>
        )
      })}
    </Grid2>
  )
}
