import React, {useEffect, useState} from "react";
import {CuteButton} from "../components/CuteButton";
import ProgressBar from "../components/Progressbar";
import SettingsModal from "../components/SettingsModal";

const filterMeetingsForCurrentWeek = (meetings: any[]) => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const endOfWeek = new Date(currentDate.setDate(startOfWeek.getDate() + 6));

    return meetings.filter((meeting) => {
        const meetingDate = new Date(meeting.start);
        return meetingDate >= startOfWeek && meetingDate <= endOfWeek;
    });
};

const subjects = [
    {name: "Algorithmen und Datenstrukturen", date: "17.02.2025", time: "10:30", room: "HQ.120", progress: 70},
    {name: "Mathematik III", date: "29.01.2025", time: "08:30", room: "KA.046", progress: 50},
    {name: "Rechnerkommunikation", date: "15.02.2025", time: "08:30", room: "HQ.120", progress: 40},
    {name: "Software Engineering", date: "27.01.2025", time: "14:00", room: "KA.046", progress: 80},
];

export default function YourStudies() {
    const [weeklyMeetings, setWeeklyMeetings] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchMeetings = async () => {
        try {
            const response = await fetch('http://localhost:8080/meeting');
            const meetings = await response.json();

            const filteredMeetings = filterMeetingsForCurrentWeek(meetings);
            setWeeklyMeetings(filteredMeetings);
        } catch (error) {
            //alert("Fehler beim Abrufen der Meetings: " + error);
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex lg:flex-row flex-col overflow-y-auto lg:items-between items-center lg:mt-16 mt-4">
            <div className="lg:w-[40%] w-[80%] bg-[#1C212C] text-white p-4 mb-12">
                <div className="md:ml-16 ml-4 w-full">
                    <h1 className="md:text-5xl text-4xl font-bold text-gray-300 text-left lg:mt-24 mt-8">Mein
                        Studium</h1>
                    <p className="text-xl font-medium text-white text-left mt-3">Aktuelle Module</p>
                    <div className="p-4 lg:mr-20 mr-8 mt-2">
                        <table className="w-full border-collapse">
                            <tbody>
                            {subjects.map((subject, index) => (
                                <tr key={index}>
                                    <td className="py-2 border-b border-[#4B708C] text-gray-300">{subject.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3">
                        <CuteButton bgColor="#598BB1" classname="lg:text-xl text-lg" textColor="#d4deff"
                                    text="Module verwalten"/>
                    </div>
                </div>
            </div>

            <div className="lg:h-[90%] lg:w-[1px] w-[90%] min-h-[2px] bg-[#1C7E70]"></div>

            <div className="lg:w-[60%] w-[80%] lg:overflow-y-scroll overflow-y-visible px-4 mb-16 justify-center">
                <div className="w-full md:px-16 px-4">
                    <p className="text-2xl font-bold text-white text-left lg:mt-4 mt-16 mb-7">Prüfungstermine</p>

                    <table className="w-full border-collapse hidden md:table">
                        <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={index}>
                                <td className="px-1 py-1 text-[#9B9B9B]">{subject.name}</td>
                                <td className="px-1 py-1 text-[#2AB19D]">{subject.date}</td>
                                <td className="px-1 py-1 text-[#9B9B9B]">{subject.time}</td>
                                <td className="px-1 py-1 text-[#9B9B9B]">{subject.room}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="md:hidden space-y-4">
                        {subjects.map((subject, index) => (
                            <div key={index} className="p-3 shadow-sm">
                                <p className="text-gray-500">
                                    {subject.name}
                                </p>
                                <p className="text-teal-500 inline">
                                    {subject.date}
                                </p>
                                <p className="text-gray-500 inline ml-2">
                                    {subject.time} {subject.room}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="text-2xl font-bold text-white text-left mt-9">Lerngruppen in dieser Woche</p>

                    <table className="w-full flex justify-center border-collapse mt-4">
                        <tbody>
                        {weeklyMeetings.map((meeting, index) => (
                            <tr key={index}>
                                <td className="px-1 py-1 text-[#9B9B9B]">{meeting.title}</td>
                                <td className="px-1 py-1 text-[#2AB19D]">
                                    {new Date(meeting.start).toLocaleDateString()}
                                </td>
                                <td className="px-1 py-1 text-[#9B9B9B]">
                                    {new Date(meeting.start).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td className="px-1 py-1 text-[#9B9B9B]">{meeting.room}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <p className="text-2xl font-bold text-white text-left mt-9 mb-6">Lernfortschritt</p>
                    {subjects.map((subject, index) => (
                        <div key={index} className="mb-6">
                            <p className="text-m text-[#9B9B9B]">{subject.name}</p>
                            <div onClick={openModal}>
                                <ProgressBar progress={subject.progress}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && <SettingsModal isOpen={isModalOpen} onClose={closeModal}/>}
        </div>
    );
}
