import React, { useEffect, useState } from "react";
import { CuteButton } from "../components/CuteButton";
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
    { name: "Algorithmen und Datenstrukturen", date: "17.02.2025", time: "10:30", room: "HQ.120", progress: 70 },
    { name: "Mathematik III", date: "29.01.2025", time: "08:30", room: "KA.046", progress: 50 },
    { name: "Rechnerkommunikation", date: "15.02.2025", time: "08:30", room: "HQ.120", progress: 40 },
    { name: "Software Engineering", date: "27.01.2025", time: "14:00", room: "KA.046", progress: 80 },
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
        <div className="flex flex-row full items-between overflow-hidden mt-16">
            <div className="w-1/3 bg-[#1C212C] flex text-white p-4">
                <div className="ml-20 w-full">
                    <h1 className="md:text-5xl font-bold text-gray-300 text-left mt-24">Mein Studium</h1>
                    <p className="text-xl font-medium text-white text-left mt-3">Aktuelle Module</p>
                    <div className="p-4 mr-20 mt-2">
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
                        <CuteButton bgColor="#598BB1" classname="lg:text-xl text-lg" textColor="#d4deff" text="Module verwalten" />
                    </div>
                </div>
            </div>

            <div className="fixed left-1/3 top-[180px] bottom-[110px] w-[1px] bg-[#1C7E70]"></div>

            <div className="w-2/3 flex overflow-y-auto p-4 mb-16 overflow-auto justify-center">
                <div className=" p-4 w-full">
                    <div className="ml-[90px] mr-[170px]">
                        <p className="text-2xl font-bold text-white text-left mt-3 mb-7">Prüfungstermine</p>

                        <table className="w-full border-collapse">
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

                        <p className="text-2xl font-bold text-white text-left mt-9">Lerngruppen in dieser Woche</p>

                        <table className="w-full border-collapse mt-4">
                            <tbody>
                                {weeklyMeetings.map((meeting, index) => (
                                    <tr key={index}>
                                        <td className="px-1 py-1 text-[#9B9B9B]">{meeting.title}</td>
                                        <td className="px-1 py-1 text-[#2AB19D]">
                                            {new Date(meeting.start).toLocaleDateString()}
                                        </td>
                                        <td className="px-1 py-1 text-[#9B9B9B]">
                                            {new Date(meeting.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                                    <ProgressBar progress={subject.progress} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && <SettingsModal isOpen={isModalOpen} onClose={closeModal} />}
        </div>
    );
}
