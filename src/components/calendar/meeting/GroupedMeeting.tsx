import React, {useState} from 'react'
import {MeetingDto} from '../../../dtos/MeetingDto'
import MeetingSearchResult from './MeetingSearchResult'
import Grid from '@mui/material/Grid2';

export default function GroupedMeeting({meetings}: { meetings: MeetingDto[] }) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

    const grouped = meetings.reduce((acc, m) => {
        acc[m.superId] = acc[m.superId] || []
        acc[m.superId].push(m)
        return acc
    }, {} as Record<number, MeetingDto[]>)

    Object.values(grouped).forEach(group =>
        group.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime())
    )

    const toggle = (sid: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            next.has(sid) ? next.delete(sid) : next.add(sid);
            return next;
        })
    }

    return (
        <Grid container spacing={3} className="my-5 overflow-y-scroll">
            {Object.entries(grouped).map(([sidStr, group]) => {
                const sid = sidStr;
                const [first, ...rest] = group;
                const isExp = expandedIds.has(sid);
                const isRepeat = rest.length > 0;

                return (
                    <React.Fragment key={sid}>
                        <Grid size={{xs: 12, md: 6, lg: 4}}>
                            <MeetingSearchResult
                                meeting={first}
                                isExpanded={!isRepeat ? undefined : isExp}
                                onToggle={isRepeat ? () => toggle(sid) : undefined}
                            />
                        </Grid>

                        {isExp && rest.map(m => (
                            <Grid size={{xs: 12, md: 6, lg: 4}} key={m.id}>
                                <MeetingSearchResult
                                    meeting={m}
                                    isExpanded={true}
                                />
                            </Grid>
                        ))}
                    </React.Fragment>
                )
            })}
        </Grid>
    )
}
