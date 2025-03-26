import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import Modal from './Modal';
import {MeetingDto} from '../dtos/MeetingDto';
import '../styles/Calendar.css';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {getMeetings} from "../api/MeetingApi";
import axiosInstance from "../AxiosConfig";
import {MeetingForm} from "../form/MeetingForm";

export default function CalendarComponent(props: { isDialogOpen: boolean }) {
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingDto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMeetingFormOpen, setIsMeetingFormOpen] = useState(false);
    const [events, setEvents] = useState<any[]>([]);
    const mdAndUp = useMediaQuery(useTheme().breakpoints.up('md'));

    const fetchMeetings = async () => {
        try {
            const response = await getMeetings(axiosInstance);

            setEvents(response.map(({id, title, date_from, date_until, description, place, repeatable}: MeetingDto) => ({
                id,
                title,
                start: new Date(date_from).toISOString(),
                end: new Date(date_until).toISOString(),
                description,
                room: place,
                repeatable: repeatable
            })));
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, [props.isDialogOpen, isMeetingFormOpen]);

    const Eventhandler = (info: any) => {
        const {event} = info;
        const id = event.id;
        const title = event.title;
        const date_from = new Date(event.start).toLocaleString();
        const date_until = new Date(event.end).toLocaleString();
        const description = event.extendedProps?.description || '';
        const place = event.extendedProps?.room || '';
        const repeatable = event.extendedProps?.repeatable || 'never';
        setSelectedMeeting({
            id,
            title,
            date_from,
            date_until,
            description,
            place,
            repeatable: repeatable,
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
                height={"80vh"}
                viewClassNames="text-gray-200 bg-black"
                dayCellClassNames="bg-[#BDBDBD]"
                slotLaneClassNames="border-black"
                eventClassNames="bg-[#598BB1] p-1"
                plugins={[timeGridPlugin]}
                locale={"deLocale"}
                initialView={mdAndUp ? "timeGridWeek" : "timeGridDay"}
                firstDay={1}
                footerToolbar={false}
                headerToolbar={{
                    right: 'prev,next today',
                    center: mdAndUp ? 'title' : '',
                    left: mdAndUp ? 'timeGridWeek,timeGridDay' : 'timeGridDay',
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
                    setIsMeetingFormOpen={setIsMeetingFormOpen}
                />
            )}
            {selectedMeeting && isMeetingFormOpen &&
                <MeetingForm open={true} onClose={() => setIsMeetingFormOpen(false)} meeting={selectedMeeting}/>
            }

        </div>
    );
}
