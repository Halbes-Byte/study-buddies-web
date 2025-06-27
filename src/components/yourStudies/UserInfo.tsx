import React, {useEffect, useState} from "react";
import ProgressBar from "../../components/Progressbar";
import {getMeetingsOfWeek} from "../../api/MeetingApi";
import axiosInstance from "../../AxiosConfig";
import {MeetingDto} from "../../dtos/MeetingDto";
import ModuleProgressSettings from "../ModuleProgressSettings";
import {Chapter, Checkbox, UserModule} from "../../dtos/ModuleDto";
import {getUser} from "../../api/UserApi";

export default function UserInfo(props: { reload: boolean }) {
    const [weeklyMeetings, setWeeklyMeetings] = useState<MeetingDto[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modules, setModules] = useState<UserModule[]>([]);
    const [activeModule, setActiveModule] = useState<UserModule | undefined>();

    const filterMeetingsForCurrentWeek = (meetings: MeetingDto[]) => {
        const currentDate = new Date();
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
        const endOfWeek = new Date(currentDate.setDate(startOfWeek.getDate() + 6));

        return meetings.filter((meeting) => {
            const meetingDate = new Date(meeting.dateFrom);
            return meetingDate >= startOfWeek && meetingDate <= endOfWeek;
        });
    };

    const fetchUserInfo = async () => {
        try {
            const response = await getUser(axiosInstance);
            setModules(response.modules);
        } catch (error) {
            console.error("Fehler beim Abrufen der UserDaten: " + error);
        }
    }

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
        fetchUserInfo();
    }, []);

    useEffect(() => {
        fetchUserInfo();
    }, [props.reload]);

    const openModal = (moduleName: string) => {
        setActiveModule(modules.find((m) => m.name === moduleName));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const calculateProgress = (module: UserModule): number => {
        if (!module.chapter?.length) return 0;

        let checked = 0;
        let total = 0;

        module.chapter.forEach((chapter: Chapter) => {
            total += chapter.checkbox.length;
            checked += chapter.checkbox.filter((box: Checkbox) => box.checked).length;
        });

        return total === 0 ? 0 : checked / total;
    }

    return (
        <div className="lg:w-[60%] w-[80%] sm:px-8 mb-16 justify-center mt-8">
            <div className="w-full md:px-16">
                <p className="text-2xl font-bold text-white text-left lg:mt-4 mt-16 mb-7">Prüfungstermine</p>

                <table className="w-full border-collapse hidden md:table">
                    <tbody>
                    {modules && modules.map((subject, index) => (
                        <tr key={index}>
                            <td className="px-1 py-1 text-[#9B9B9B]">{subject.name}</td>
                            <td className="px-1 py-1 text-[#2AB19D]">DATE</td>
                            <td className="px-1 py-1 text-[#9B9B9B]">TIME</td>
                            <td className="px-1 py-1 text-[#9B9B9B]">ROOM</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="md:hidden space-y-4">
                    {modules && modules.map((subject, index) => (
                        <div key={index} className="p-3 shadow-sm">
                            <p className="text-[#9B9B9B]">
                                {subject.name}
                            </p>
                            <p className="text-[#2AB19D] inline">
                                DATE
                            </p>
                            <p className="text-[#9B9B9B] inline ml-2">
                                TIME ROOM
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
                {modules && modules.map((subject, index) => (
                    <div key={index} className="mb-6">
                        <p className="text-m text-[#9B9B9B]">{subject.name}</p>
                        <div onClick={() => {
                            openModal(subject.name)
                        }}>
                            <ProgressBar progress={calculateProgress(subject)}/>
                        </div>
                    </div>
                ))}
            </div>
            {
                isModalOpen && activeModule &&
                <ModuleProgressSettings onClose={closeModal} module={activeModule} allUserModules={modules}/>
            }
        </div>
    );
}
