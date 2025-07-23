import '../index.css';
import React, {useState} from "react";
import {CuteButton} from "../components/CuteButton";
import {CreateOrUpdateMeetingForm} from "../components/calendar/forms/CreateOrUpdateMeetingForm";
import CalendarComponent from "../components/calendar/CalendarComponent";
import {SearchMeetingForm} from "../components/calendar/forms/SearchMeetingForm";

export default function CalenderPage() {
    const [isCreateMeetingDialogOpen, setCreateMeetingDialogOpen] = useState(false);
    const [isSearchMeetingDialogOpen, setSearchMeetingDialogOpen] = useState(false);

    return (
        <>
            <div className={"flex flex-row gap-4 justify-end my-4 md:mx-8 h-10"}>
                <CuteButton bgColor={"#598BB1"} textColor={"#e6ebfc"} text={"Termin eintragen"}
                            classname={"md:text-xl sm:text-base text-sm"}
                            onClick={() => setCreateMeetingDialogOpen(true)}/>
                <CuteButton bgColor={"#56A095"} textColor={"#e8fcf6"} classname={"md:text-xl sm:text-base text-sm"}
                            text={"Finde ein Meeting"} onClick={() => setSearchMeetingDialogOpen(true)}/>
            </div>
            <CreateOrUpdateMeetingForm open={isCreateMeetingDialogOpen} onClose={() => setCreateMeetingDialogOpen(false)}/>
            <SearchMeetingForm open={isSearchMeetingDialogOpen} onClose={() => setSearchMeetingDialogOpen(false)}/>
            <div className="flex overflow-hidden flex-col justify-center sm:mx-10 mx-3">
                <CalendarComponent isDialogOpen={isCreateMeetingDialogOpen || isSearchMeetingDialogOpen}/>
            </div>
        </>
    );
}
