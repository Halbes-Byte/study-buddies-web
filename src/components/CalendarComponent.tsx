import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import Modal from './Modal';
import { MeetingDto } from '../dtos/MeetingDto';

export default function CalendarComponent() {
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  const fetchMeetings = async () => {
    try {
      const response = await fetch('http://localhost:8080/meeting');
      if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);
  
      const meetings = await response.json();
      setEvents(meetings.map(({ title, date_from, date_until, description, place }: any) => ({
        title,
        start: new Date(date_from).toISOString(),
        end: new Date(date_until).toISOString(),
        description,
        room: place,
      })));
    } catch (error) {
      console.error('Fehler beim Abrufen der Meetings:', error);
    }
  };
  
  

  useEffect(() => {
    fetchMeetings();
  }, []);

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
      repeatable: 'false',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        events={events}
        eventClick={Eventhandler}
      />
      {selectedMeeting && (
        <Modal
          isOpen={isModalOpen}
          meeting={selectedMeeting}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
