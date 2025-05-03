import React, {useEffect, useState} from "react";
import {CuteButton} from "../components/CuteButton";
import ProgressBar from "../components/Progressbar";
import ModuleProgressSettings from "../components/ModuleProgressSettings";
import {getMeetingsOfWeek} from "../api/MeetingApi";
import axiosInstance from "../AxiosConfig";
import {MeetingDto} from "../dtos/MeetingDto";
import {getUser, updateUserModules, updateUsername} from "../api/UserApi";
import {UserDto} from "../dtos/UserDto";
import {ModuleDto} from "../dtos/ModuleDto";
import {createModule, getModules} from "../api/ModuleApi";

const subjects = [
    {name: "Algorithmen und Datenstrukturen", date: "17.02.2025", time: "10:30", room: "HQ.120", progress: 70},
    {name: "Mathematik III", date: "29.01.2025", time: "08:30", room: "KA.046", progress: 50},
    {name: "Mensch-Computer-Interaktion", date: "15.02.2025", time: "08:30", room: "HQ.120", progress: 40},
    {name: "Software Engineering", date: "27.01.2025", time: "14:00", room: "KA.046", progress: 80},
];

export default function YourStudies() {
    const [weeklyMeetings, setWeeklyMeetings] = useState<MeetingDto[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [user, setUser] = useState<UserDto | undefined>();
    const [editProfile, setEditProfile] = useState(false);
    const [editModule, setEditModule] = useState(false);
    const [profileName, setProfileName] = useState(user?.username);
    const [ownModules, setownModules] = useState<ModuleDto[]>([]);
    const [allModules, setAllModules] = useState<ModuleDto[]>([]);
    const [module, setModule] = useState<string>("");

    const filterMeetingsForCurrentWeek = (meetings: MeetingDto[]) => {
        const currentDate = new Date();
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
        const endOfWeek = new Date(currentDate.setDate(startOfWeek.getDate() + 6));

        return meetings.filter((meeting) => {
            const meetingDate = new Date(meeting.dateFrom);
            return meetingDate >= startOfWeek && meetingDate <= endOfWeek;
        });
    };

    const fetchAllModules = async () => {
        try {
            const response = await getModules(axiosInstance);
            setAllModules(response);
        } catch (error) {
            alert("Error fetching user modules:" + error);
        }
    }

    const fetchMeetings = async () => {
        try {
            const response = await getMeetingsOfWeek(axiosInstance);
            setWeeklyMeetings(filterMeetingsForCurrentWeek(response));
        } catch (error) {
            alert("Fehler beim Abrufen der Meetings: " + error);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const response = await getUser(axiosInstance);
            setUser(response);
        } catch (error) {
            alert("Fehler beim Abrufen der UserDaten: " + error);
        }
    }

    useEffect(() => {
        fetchMeetings();
        fetchAllModules();
        fetchUserInfo();
    }, []);

    const editProfileMode = (mode: boolean) => {
        setProfileName(user?.username);
        setEditProfile(mode);
    }

    const saveProfileModifications = () => {
        if (!profileName) {
            return;
        }
        updateUsername(axiosInstance, profileName);
        editProfileMode(false);
        fetchUserInfo();
    }

    const saveNewModule = async () => {
        try {
            await createModule(axiosInstance, module);
            fetchAllModules();
        } catch (error) {
            alert("Error fetching user modules:" + error);
        }
    }

    const saveModules = async () => {
        try {
            await updateUserModules(axiosInstance, ownModules);
            fetchAllModules();
        } catch (error) {
            alert("Error fetching user modules:" + error);
        }
    }

    const addModule = () => {
        setownModules([...ownModules, {name: module}]);
        setModule("");
        if (!allModules.some(m => m.name === module.toUpperCase()))
            saveNewModule();
    }

    const deleteModule = (moduleName: string) => {
        setownModules(ownModules.filter(m => m.name !== moduleName));
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const editModulesMode = (mode: boolean) => {
        setEditModule(mode);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div
            className="flex lg:justify-between justify-start lg:flex-row flex-col overflow-y-scroll lg:items-start items-center lg:mt-12 mt-4 h-full">
            <div className="lg:w-[40%] w-[80%] bg-[#1C212C] text-white sm:p-4 mb-12 lg:ml-16 ml-4 ">
                <div className="w-full">
                    <h1 className="md:text-5xl text-4xl font-bold text-gray-300 text-left mt-16">Mein
                        Studium</h1>
                    <p className="text-xl font-medium text-white text-left mt-3">Mein Profil</p>
                    <div className="p-4 lg:mr-20 mr-8 mt-2">
                        {editProfile ? (
                            <input
                                id="profileName"
                                type="text"
                                placeholder={"Name"}
                                className="text-gray-300 block bg-[#333C4F] w-full px-10 py-2 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-550 placeholder:text-xs"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                            />
                        ) : (
                            <p className="py-2 border-b border-[#4B708C] text-gray-300">Name: {user?.username}</p>
                        )}
                    </div>
                    <div className="mt-3 mb-8">
                        {editProfile ? (
                            <div className={"flex items-center w-full gap-2 lg:pr-20 pr-8"}>
                                <CuteButton classname="lg:text-base text-sm ml-auto" bgColor={"#598BB1"}
                                            textColor={"#e6ebfc"} onClick={() => editProfileMode(false)}
                                            text="Abbrechen"/>
                                <CuteButton classname="lg:text-lg text-base" bgColor={"#56A095"} textColor={"#e8fcf6"}
                                            onClick={saveProfileModifications}
                                            text="Speichern"/>
                            </div>
                        ) : (
                            <CuteButton bgColor="#598BB1" classname="lg:text-lg text-base" textColor="#e6ebfc"
                                        text="Profil verwalten" onClick={() => editProfileMode(true)}/>
                        )}

                    </div>
                    <p className="text-xl font-medium text-white text-left mt-3">Aktuelle Module</p>
                    <div className="p-4 lg:mr-20 mr-8 mt-2">
                        <table className="w-full border-collapse">
                            <tbody>
                            {editModule ? (
                                <div className={"flex flex-col gap-4"}>
                                    {ownModules.map((subject) => (
                                        <div
                                            className={"flex flex-row justify-between pr-4 py-1 border-b border-[#4B708C] text-gray-300"}>
                                            <p>{subject.name}</p>
                                            <button
                                                onClick={() => deleteModule(subject.name)}
                                            >
                                                x
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        id="module"
                                        type="text"
                                        placeholder={"Modul"}
                                        className="text-gray-300 block bg-[#333C4F] w-full px-10 py-2 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-550 placeholder:text-xs"
                                        value={module}
                                        onChange={(e) => setModule(e.target.value)}
                                    />

                                    <datalist id="modules">
                                        {allModules.map((module, index) => (
                                            <option key={index} className={"w-full"} value={module.name}/>
                                        ))}
                                    </datalist>
                                    <div className="flex flex-col w-full my-4">
                                        <button
                                            className="bg-[#2EF6D9] text-white cursor-pointer p-[10px] border-none w-[30px] h-[30px] rounded font-semibold text-[16px] inline-flex items-center"
                                            onClick={() => addModule()}>
                                            +
                                        </button>
                                    </div>

                                </div>
                            ) : (
                                ownModules.map((subject, index) => (
                                    <tr key={index}>
                                        <td className="py-2 border-b border-[#4B708C] text-gray-300">{subject.name}</td>
                                    </tr>
                                ))

                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3">
                        {editModule ? (
                            <div className={"flex items-center w-full gap-2 lg:pr-20 pr-8"}>
                                <CuteButton classname="lg:text-base text-sm ml-auto" bgColor={"#598BB1"}
                                            textColor={"#e6ebfc"} onClick={() => editModulesMode(false)}
                                            text="Abbrechen"/>
                                <CuteButton classname="lg:text-lg text-base" bgColor={"#56A095"} textColor={"#e8fcf6"}
                                            onClick={saveModules}
                                            text="Speichern"/>
                            </div>
                        ) : (
                            <CuteButton bgColor="#598BB1" classname="lg:text-lg text-base" textColor="#e6ebfc"
                                        text="Module verwalten" onClick={() => editModulesMode(true)}/>
                        )}
                    </div>
                </div>
            </div>

            <div className="lg:h-[90%] lg:w-[1px] w-[90%] min-h-[2px] bg-[#1C7E70]"></div>

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
                                <td className="px-1 py-1 text-[#9B9B9B]">{meeting.title}</td>
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
                                    {meeting.title}
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
            </div>

            {
                isModalOpen && <ModuleProgressSettings isOpen={isModalOpen} onClose={closeModal}/>
            }
        </div>
    )
        ;
}
