import '../index.css';
import React, {useState} from "react";
import {CuteButton} from "../components/CuteButton";
import {MeetingForm} from "../form/MeetingForm";
import CalendarComponent from "../components/CalendarComponent";

export default function CalenderPage() {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openMeetingForm = () => {
        setDialogOpen(true);
    };

    const closeMeetingForm = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <div className={"flex flex-row gap-4 justify-end my-4 md:mx-8 h-10"}>
                <CuteButton bgColor={"#598BB1"} textColor={"#ffffff"} text={"Termin eintragen"} classname={"md:text-xl sm:text-base text-sm"}
                            onClick={openMeetingForm}/>
                <CuteButton bgColor={"#56A095"} textColor={"#e8fcf6"} classname={"md:text-xl sm:text-base text-sm"}
                            text={"Finde ein Meeting"} onClick={() => {
                }}/>
            </div>
            <MeetingForm open={isDialogOpen} onClose={closeMeetingForm}/>
            <div className="flex overflow-hidden flex-col justify-center sm:mx-10 mx-3">
                <CalendarComponent isDialogOpen={isDialogOpen} />
            </div>
        </>
    );
}
