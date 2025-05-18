import React, { useState } from 'react';
import { MeetingDto } from '../../dtos/MeetingDto';
import MeetingSearchResult from './MeetingSearchResult';
import { Grid2 } from '@mui/material';

interface Props {
  meetings: MeetingDto[];
}

export default function GroupedMeeting({ meetings }: Props) {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const grouped = meetings.reduce<Record<number, MeetingDto[]>>((acc, m) => {
    (acc[m.superId] = acc[m.superId] || []).push(m);
    return acc;
  }, {});

  Object.values(grouped).forEach(group =>
    group.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime())
  );

 const toggle = (sid: number) => {
  setExpandedIds(prev => {
    const newExpandedIds = new Set(prev);
    if (newExpandedIds.has(sid)) {
      newExpandedIds.delete(sid);
    } else {
      newExpandedIds.add(sid);
    }
    return newExpandedIds;
  });
};

return (
  <Grid2 container spacing={3} className="my-5 overflow-y-scroll">
    {Object.entries(grouped).map(([sidStr, group]) => {
      const sid = Number(sidStr);
      const [first, ...rest] = group;
      const isExp = expandedIds.has(sid);
      const isRepeatable = rest.length > 0;

      return (
        <React.Fragment key={sid}>
          <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
            <div className="relative">
              <MeetingSearchResult
                meeting={first}
                isRepeatable={isRepeatable}
                isExpanded={isExp}
                onToggle={isRepeatable ? () => toggle(sid) : undefined}
              />
            </div>
          </Grid2>

          {isExp && rest.map(m => (
            <Grid2 key={m.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <MeetingSearchResult
                meeting={m}
                isRepeatable={false}
                isExpanded={true}
              />
            </Grid2>
          ))}
        </React.Fragment>
      );
    })}
  </Grid2>
);

}
