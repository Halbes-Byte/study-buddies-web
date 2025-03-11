import '../index.css';
import title_img from '../data//titelbild.png';
import React, {useState} from "react";
import {CuteButton} from "../components/CuteButton";
import {MeetingForm} from "../form/MeetingForm";
import axiosInstance from "../AxiosConfig";

export default function Homepage() {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openMeetingForm = () => {
        setDialogOpen(true);
    };

    const getHello = async () => {
        try {
            const response = await axiosInstance.get('/hello');
            console.log(response);
        } catch (error) {
            alert(error);
        }
    };

    const closeMeetingForm = () => {
        setDialogOpen(false);
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
                            <CuteButton bgColor={"#598BB1"} classname={"lg:text-xl text-lg"} textColor={"#d4deff"}
                                        text={"Erstelle einen Termin"} onClick={openMeetingForm}/>
                            <CuteButton bgColor={"#56A095"} classname={"lg:text-xl text-lg"} textColor={"#e8fcf6"}
                                        text={"Finde einen Lernpartner"} onClick={getHello}/>
                        </div>
                    </div>

                    <div className="md:w-[150%] self-center md:block hidden justify-self-start">

                        <img className="object-cover overflow-visible justify-self-start self-center" src={title_img}
                             alt={"titelbild"}/>
                    </div>
                </div>
            </div>
            <MeetingForm open={isDialogOpen} onClose={closeMeetingForm}/>
        </div>
    );
}