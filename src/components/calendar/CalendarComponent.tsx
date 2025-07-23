import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {MeetingDetails} from './meeting/MeetingDetails';
import {MeetingDto} from '../../dtos/MeetingDto';
import '../../styles/Calendar.css';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {getAttendedMeetings} from "../../api/MeetingApi";
import axiosInstance from "../../auth/AxiosConfig";
import {CreateOrUpdateMeetingForm} from "./forms/CreateOrUpdateMeetingForm";
import {EventSourceInput} from '@fullcalendar/core';
import {ChooseMeetingForm} from "./forms/ChooseMeetingForm";

export default function CalendarComponent(props: { isDialogOpen: boolean }) {
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingDto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMeetingFormOpen, setIsMeetingFormOpen] = useState(false);
    const [isChooseMeetingOpen, setChooseMeetingOpen] = useState(false);
    const [editOnlyThisMeeting, setEditOnlyThisMeeting] = useState(true);
    const [events, setEvents] = useState<MeetingDto[]>([]);
    const mdAndUp = useMediaQuery(useTheme().breakpoints.up('md'));

    const fetchMeetings = async () => {
        try {
            const response = await getAttendedMeetings(axiosInstance);
            setEvents(response);
        } catch (error) {
            console.error(error);
        }
    };

    function mapMeetingsToEvents(meetings: MeetingDto[]): EventSourceInput {
        return meetings.map(meeting => ({
            id: meeting.id.toString(),
            superId: meeting.superId.toString(),
            title: meeting.module,
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

    const eventhandler = (info: any) => {
        const {event} = info;
        setSelectedMeeting({
            id: event.id,
            superId: event.extendedProps?.superId || '',
            module: event.title,
            dateFrom: new Date(event.start).toLocaleString(),
            dateUntil: new Date(event.end).toLocaleString(),
            description: event.extendedProps?.description || '',
            place: event.extendedProps?.room || '',
            repeatable: event.extendedProps?.repeatable || 'never',
            creator: event.extendedProps?.creator || '',
            member: event.extendedProps?.member || [],
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchMeetings();
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
                eventClick={eventhandler}
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
                                           meeting={selectedMeeting} onlyThisMeeting={editOnlyThisMeeting}/>
            }
            {isChooseMeetingOpen &&
                <ChooseMeetingForm onClose={() => setChooseMeetingOpen(false)} setOnlyThisMeeting={setEditOnlyThisMeeting}
                                   openMeetingForm={() => setIsMeetingFormOpen(true)}/>
            }
        </div>
    );
}
