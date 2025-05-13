import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import MeetingDetails from './meeting/MeetingDetails';
import {MeetingDto} from '../dtos/MeetingDto';
import '../styles/Calendar.css';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {getMeetings} from "../api/MeetingApi";
import axiosInstance from "../AxiosConfig";
import {CreateOrUpdateMeetingForm} from "../form/CreateOrUpdateMeetingForm";
import {EventSourceInput} from '@fullcalendar/core';
import {ChooseMeetingForm} from "../form/ChooseMeetingForm";

export default function CalendarComponent(props: { isDialogOpen: boolean }) {
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingDto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMeetingFormOpen, setIsMeetingFormOpen] = useState(false);
    const [isChooseMeetingOpen, setChooseMeetingOpen] = useState(false);
    const [onlyThisMeeting, setOnlyThisMeeting] = useState(true);
    const [events, setEvents] = useState<MeetingDto[]>([]);
    const mdAndUp = useMediaQuery(useTheme().breakpoints.up('md'));

    const fetchMeetings = async () => {
        try {
            const response = await getMeetings(axiosInstance);
            setEvents(response);
        } catch (error) {
            console.error(error);
        }
    };

    function mapMeetingsToEvents(meetings: MeetingDto[]): EventSourceInput {
        return meetings.map(meeting => ({
            id: meeting.id.toString(),
            superId: meeting.superId.toString(),
            title: meeting.title,
            start: new Date(meeting.dateFrom).toISOString(),
            end: new Date(meeting.dateUntil).toISOString(),
            description: meeting.description,
            room: meeting.place,
            repeatable: meeting.repeatable,
            creator: meeting.creator,
            member: meeting.member,
        }))
    }

    useEffect(() => {
        fetchMeetings();
    }, [props.isDialogOpen, isMeetingFormOpen]);

    const Eventhandler = (info: any) => {
        const {event} = info;
        const id = event.id;
        const title = event.title;
        const date_from = new Date(event.start).toLocaleString();
        const date_until = new Date(event.end).toLocaleString();
        const superId = event.extendedProps?.superId || '';
        const description = event.extendedProps?.description || '';
        const place = event.extendedProps?.room || '';
        const repeatable = event.extendedProps?.repeatable || 'never';
        const creator = event.extendedProps?.creator || '';
        const member = event.extendedProps?.member || [];
        setSelectedMeeting({
            id: id,
            superId: superId,
            title,
            dateFrom: date_from,
            dateUntil: date_until,
            description,
            place,
            repeatable: repeatable,
            creator: creator,
            member: member,
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
                events={mapMeetingsToEvents(events)}
                eventClick={Eventhandler}
            />
            {selectedMeeting && (
                <MeetingDetails
                    isOpen={isModalOpen}
                    meeting={selectedMeeting}
                    onClose={closeModal}
                    openMeetingForm={() => setIsMeetingFormOpen(true)}
                    openChooseMeetingModal={() => setChooseMeetingOpen(true)}
                />
            )}
            {selectedMeeting && isMeetingFormOpen &&
                <CreateOrUpdateMeetingForm open={true} onClose={() => setIsMeetingFormOpen(false)}
                                           meeting={selectedMeeting} onlyThisMeeting={onlyThisMeeting}/>
            }
            {isChooseMeetingOpen &&
                <ChooseMeetingForm onClose={() => setChooseMeetingOpen(false)} setOnlyThisMeeting={setOnlyThisMeeting}
                                   openMeetingForm={() => setIsMeetingFormOpen(true)}/>
            }
        </div>
    );
}
