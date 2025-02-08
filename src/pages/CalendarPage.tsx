import '../index.css';
import React, {useEffect, useState} from "react";
import {CuteButton} from "../components/CuteButton";
import {MeetingForm} from "../form/MeetingForm";
import {getMeetings} from "../api/MeetingApi";
import axios from "axios";
import {MeetingDto} from "../dtos/MeetingDto";
import CalendarComponent from "../components/CalendarComponent";

export default function CalenderPage() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [meetings, setMeetings] = useState<MeetingDto[] | null>(null);

    useEffect(() => {const fetchMeetings = async () => {
            try {
                const response = await getMeetings(axios);
                setMeetings(response);
            } catch (err) {
                alert(err);
            }
        };
        fetchMeetings();
    }, [isDialogOpen]);

    const openMeetingForm = () => { setDialogOpen(true);
    };

    const closeMeetingForm = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <div className={"flex flex-row justify-end my-4 mx-8 h-10"}>
                <CuteButton bgColor={"#598BB1"} textColor={"#ffffff"} text={"Termin eintragen"}
                            onClick={openMeetingForm}/>
            </div>
            <MeetingForm open={isDialogOpen} onClose={closeMeetingForm}/>
            <div className="flex flex-col justify-center mx-10">
                <CalendarComponent/>
            </div>
        </>
    );
}
