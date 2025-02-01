import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import "../styles/Calendar.css";

export default function CalendarComponent() {
    return (
            <FullCalendar
                allDaySlot={false}
                scrollTime="08:00:00"
                slotMinTime="00:00:00"
                slotMaxTime="24:00:00"
                height={"85vh"}
                viewClassNames="text-gray-200 bg-black"
                dayCellClassNames="bg-[#BDBDBD]"
                slotLaneClassNames="border-black"
                eventClassNames="bg-[#598BB1] p-1"
                plugins={[timeGridPlugin]}
                locale={"deLocale"}
                initialView="timeGridWeek"
                firstDay={1}
                footerToolbar={false}
                headerToolbar={{
                    right: 'prev,next today',
                    center: 'title',
                    left: 'timeGridWeek,timeGridDay',
                }}
                buttonText={{
                    today: 'Heute',
                    day: 'Tag',
                    week: 'Woche',
                }}
                dayHeaderFormat={{weekday: 'short', day: '2-digit', month: '2-digit', omitCommas: true}}
                titleFormat={{ day: '2-digit', month: 'short', year: '2-digit' }}
                events={[
                    {title: 'Meeting', start: '2025-02-03T10:30:00', end: '2025-02-03T12:00:00', interactive: true},
                    {title: 'Meeting2', start: '2025-02-03T11:30:00', end: '2025-02-03T14:00:00'},
                    {title: 'Meeting2', start: '2025-02-03T09:30:00', end: '2025-02-03T11:00:00'},
                ]}
            />
    );
}
