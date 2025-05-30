import React, {useEffect, useState} from "react";
import ProgressBar from "../../components/Progressbar";
import {getMeetingsOfWeek} from "../../api/MeetingApi";
import axiosInstance from "../../AxiosConfig";
import {MeetingDto} from "../../dtos/MeetingDto";
import ModuleProgressSettings from "../ModuleProgressSettings";

const subjects = [
    {name: "Algorithmen und Datenstrukturen", date: "17.02.2025", time: "10:30", room: "HQ.120", progress: 70},
    {name: "Mathematik III", date: "29.01.2025", time: "08:30", room: "KA.046", progress: 50},
    {name: "Mensch-Computer-Interaktion", date: "15.02.2025", time: "08:30", room: "HQ.120", progress: 40},
    {name: "Software Engineering", date: "27.01.2025", time: "14:00", room: "KA.046", progress: 80},
];

export default function UserInfo() {
    const [weeklyMeetings, setWeeklyMeetings] = useState<MeetingDto[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const filterMeetingsForCurrentWeek = (meetings: MeetingDto[]) => {
        const currentDate = new Date();
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
        const endOfWeek = new Date(currentDate.setDate(startOfWeek.getDate() + 6));

        return meetings.filter((meeting) => {
            const meetingDate = new Date(meeting.dateFrom);
            return meetingDate >= startOfWeek && meetingDate <= endOfWeek;
        });
    };

    const fetchMeetings = async () => {
        try {
            const response = await getMeetingsOfWeek(axiosInstance);
            setWeeklyMeetings(filterMeetingsForCurrentWeek(response));
        } catch (error) {
            console.error("Fehler beim Abrufen der Meetings: " + error);
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
        <div className="lg:w-[60%] w-[80%] sm:px-8 mb-16 justify-center mt-8">
            <div className="w-full md:px-16">
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
                            <p className="text-[#9B9B9B]">
                                {subject.name}
                            </p>
                            <p className="text-[#2AB19D] inline">
                                {subject.date}
                            </p>
                            <p className="text-[#9B9B9B] inline ml-2">
                                {subject.time} {subject.room}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-2xl font-bold text-white text-left mt-9">Lerngruppen in dieser Woche</p>

                <table className="w-full border-collapse hidden md:table">
                    <tbody>
                    {weeklyMeetings.map((meeting, index) => (
                        <tr key={index}>
                            <td className="px-1 py-1 text-[#9B9B9B]">{meeting.module}</td>
                            <td className="px-1 py-1 text-[#2AB19D]">
                                {new Date(meeting.dateFrom).toLocaleDateString()}
                            </td>
                            <td className="px-1 py-1 text-[#9B9B9B]">
                                {new Date(meeting.dateFrom).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </td>
                            <td className="px-1 py-1 text-[#9B9B9B]">{meeting.place}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="md:hidden space-y-4">
                    {weeklyMeetings.map((meeting, index) => (
                        <div key={index} className="p-3 shadow-sm">
                            <p className="text-[#9B9B9B]">
                                {meeting.module}
                            </p>
                            <p className="text-[#2AB19D] inline">
                                {new Date(meeting.dateFrom).toLocaleDateString()}
                            </p>
                            <p className="text-[#9B9B9B] inline ml-2">
                                {new Date(meeting.dateFrom).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })} {meeting.place}
                            </p>
                        </div>
                    ))}
                </div>

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
            {
                isModalOpen && <ModuleProgressSettings isOpen={isModalOpen} onClose={closeModal}/>
            }
        </div>
    );
}
