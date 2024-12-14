import '../index.css';
import React, {useState} from "react";
import {CuteButton} from "../components/CuteButton";
import {MeetingForm} from "../form/MeetingForm";


export default function Calender() {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openMeetingForm = () => {
        setDialogOpen(true);
    };

    const closeMeetingForm = () => {
        setDialogOpen(false);
    };

    return (
        <div className={"flex flex-row justify-end my-4 mx-8 h-10"}>
            <CuteButton bgColor={"#598BB1"} textColor={"#ffffff"} text={"Termin eintragen"} onClick={openMeetingForm}/>
            <MeetingForm open={isDialogOpen} onClose={closeMeetingForm} />
        </div>
    );
}

