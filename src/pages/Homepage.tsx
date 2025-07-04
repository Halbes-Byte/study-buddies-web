import '../index.css';
import title_img from '../data//titelbild.png';
import React, {useState} from "react";
import {CuteButton} from "../components/CuteButton";
import {CreateOrUpdateMeetingForm} from "../components/calendar/forms/CreateOrUpdateMeetingForm";
import {SearchMeetingForm} from "../components/calendar/forms/SearchMeetingForm";

export default function Homepage() {
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
        <div className=" h-screen relative items-center justify-center justify-items-center grid">
            <div className="h-[70%] relative self-start grid justify-items-center">
                <div className="md:grid px-5 flex grid-cols-4 gap-1 justify-self-end">

                    <div className="flex flex-col gap-3 justify-self-end grid-cols-subgrid  col-span-2 self-center">
                        <h1 className="md:text-7xl text-5xl font-bold text-gray-300 text-center">Study-Buddies</h1>
                        <p className="text-xl font-medium text-gray-300 text-center">Finde deinen Study-Buddy für deine
                            Study-Party</p>
                        <div className="px-0 py-0 flex flex-row justify-start gap-7 h-12">
                            <CuteButton bgColor={"#598BB1"} classname={"lg:text-xl text-lg"} textColor={"#e6ebfc"}
                                        text={"Erstelle einen Termin"} onClick={openCreateMeetingForm}/>
                            <CuteButton bgColor={"#56A095"} classname={"lg:text-xl text-lg"} textColor={"#e8fcf6"}
                                        text={"Finde einen Lernpartner"} onClick={openSearchMeetingForm}/>
                        </div>
                    </div>

                    <div className="md:w-[150%] self-center md:block hidden justify-self-start">

                        <img className="object-cover overflow-visible justify-self-start self-center" src={title_img}
                             alt={"titelbild"}/>
                    </div>
                </div>
            </div>
            <CreateOrUpdateMeetingForm open={isCreateMeetingDialogOpen} onClose={closeCreateMeetingForm}/>
            <SearchMeetingForm open={isSearchMeetingDialogOpen} onClose={closeSearchMeetingForm}/>
        </div>
    );
}