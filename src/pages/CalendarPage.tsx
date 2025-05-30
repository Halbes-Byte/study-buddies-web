import '../index.css';
import React, {useState} from "react";
import {CuteButton} from "../components/CuteButton";
import {CreateOrUpdateMeetingForm} from "../form/CreateOrUpdateMeetingForm";
import CalendarComponent from "../components/CalendarComponent";
import {SearchMeetingForm} from "../form/SearchMeetingForm";

export default function CalenderPage() {
    const [isCreateMeetingDialogOpen, setCreateMeetingDialogOpen] = useState(false);
    const [isSearchMeetingDialogOpen, setSearchMeetingDialogOpen] = useState(false);

    const openCreateMeetingForm = () => {
        setCreateMeetingDialogOpen(true);
    };

    const closeCreateMeetingForm = () => {
        setCreateMeetingDialogOpen(false);
    };

    const openSearchMeetingForm = () => {
        setSearchMeetingDialogOpen(true);
    };

    const closeSearchMeetingForm = () => {
        setSearchMeetingDialogOpen(false);
    };

    return (
        <>
            <div className={"flex flex-row gap-4 justify-end my-4 md:mx-8 h-10"}>
                <CuteButton bgColor={"#598BB1"} textColor={"#e6ebfc"} text={"Termin eintragen"}
                            classname={"md:text-xl sm:text-base text-sm"}
                            onClick={openCreateMeetingForm}/>
                <CuteButton bgColor={"#56A095"} textColor={"#e8fcf6"} classname={"md:text-xl sm:text-base text-sm"}
                            text={"Finde ein Meeting"} onClick={openSearchMeetingForm}/>
            </div>
            <CreateOrUpdateMeetingForm open={isCreateMeetingDialogOpen} onClose={closeCreateMeetingForm}/>
            <SearchMeetingForm open={isSearchMeetingDialogOpen} onClose={closeSearchMeetingForm}/>
            <div className="flex overflow-hidden flex-col justify-center sm:mx-10 mx-3">
                <CalendarComponent isDialogOpen={isCreateMeetingDialogOpen || isSearchMeetingDialogOpen}/>
            </div>
        </>
    );
}
