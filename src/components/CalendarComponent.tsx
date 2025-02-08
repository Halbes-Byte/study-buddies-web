import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import Modal from './Modal';
import { MeetingDto } from '../dtos/MeetingDto';  

export default function CalendarComponent() {
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDto | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const Eventhandler = (info: any) => {
    const { event } = info;

    const title = event.title;
    const date_from = new Date(event.start).toLocaleString();
    const date_until = new Date(event.end).toLocaleString();
    const description = event.extendedProps?.description || '';
    const place = event.extendedProps?.room || '';

    setSelectedMeeting({
      title,
      date_from,
      date_until,
      description,
      place,
      repeatable: 'false' 
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const convertMeetingToDto = (meeting: MeetingDto): MeetingDto => {
    return {
      title: meeting.title,
      description: meeting.description,
      date_from: meeting.date_from,
      date_until: meeting.date_until,
      repeatable: 'false', 
      place: meeting.place
    };
  };

  return (
    <div>
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
        events={[
          { title: 'Meeting 1', start: '2025-02-03T10:30:00', end: '2025-02-03T12:00:00', description: 'Vorbereitung für Prüfung am 16.03.', room: 'HQ.102' },
          { title: 'Meeting 2', start: '2025-02-03T11:30:00', end: '2025-02-03T14:00:00', description: 'Wiederholung des Stoffes Vorlesung Algorithmen 1', room: 'HQ.406' },
          { title: 'Meeting 3', start: '2025-02-03T09:30:00', end: '2025-02-03T11:00:00', description: 'Übung vom 06.01. vorbereiten', room: 'HQ.411' },
        ]}
        eventClick={Eventhandler} 
      />

      {selectedMeeting && (
        <Modal
          isOpen={isModalOpen} 
          meeting={convertMeetingToDto(selectedMeeting)} 
          onClose={closeModal}
        />
      )}
    </div>
  );
}
