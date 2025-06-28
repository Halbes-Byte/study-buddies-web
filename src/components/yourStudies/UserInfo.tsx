import React, {useState, useEffect} from "react";
import ProgressBar from "../../components/Progressbar";
import {getMeetingsOfWeek} from "../../api/MeetingApi";
import axiosInstance from "../../AxiosConfig";
import {MeetingDto} from "../../dtos/MeetingDto";
import ModuleProgressSettings from "../ModuleProgressSettings";
import {UserModule} from "../../dtos/ModuleDto";
import {getUser, updateUserModules} from "../../api/UserApi";
import ExamDateModal from "../../components/meeting/ExamDateModal";

export default function UserInfo(props: { reload: boolean }) {
    const [weeklyMeetings, setWeeklyMeetings] = useState<MeetingDto[]>([]);
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
    const [isExamModalOpen, setIsExamModalOpen] = useState(false);
    const [modules, setModules] = useState<UserModule[]>([]);
    const [activeModule, setActiveModule] = useState<UserModule | undefined>();

    useEffect(() => {
        fetchUserInfo();
        fetchMeetings();
    }, []);

    useEffect(() => {
        fetchUserInfo();
    }, [props.reload]);

    async function fetchUserInfo() {
        try {
            const user = await getUser(axiosInstance);
            setModules(user.modules as UserModule[]);
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchMeetings() {
        try {
            const resp = await getMeetingsOfWeek(axiosInstance);
            setWeeklyMeetings(filterMeetingsForCurrentWeek(resp));
        } catch (e) {
            console.error(e);
        }
    }

    function filterMeetingsForCurrentWeek(meetings: MeetingDto[]) {
        const now = new Date();
        const start = new Date(now.setDate(now.getDate() - now.getDay() + 1));
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return meetings.filter(m => {
            const d = new Date(m.dateFrom);
            return d >= start && d <= end;
        });
    }

    function calculateProgress(module: UserModule) {
        if (!module.chapter) return 0;
        let total = 0, checked = 0;
        module.chapter.forEach(ch => {
            total += ch.checkbox.length;
            checked += ch.checkbox.filter(b => b.checked).length;
        });
        return total === 0 ? 0 : checked / total;
    }

    const openProgressModal = (name: string) => {
        setActiveModule(modules.find(m => m.name === name));
        setIsProgressModalOpen(true);
    };

    const closeProgressModal = () => {
        setIsProgressModalOpen(false);
        fetchUserInfo()
    };

    const openExamModal = () => setIsExamModalOpen(true);
    const closeExamModal = () => setIsExamModalOpen(false);

    const handleAddExam = async (moduleName: string, date: string, time: string, room: string) => {
        const updated = modules.map(m =>
            m.name === moduleName
                ? {...m, examDate: date, examTime: time, examLoc: room}
                : m
        );
        try {
            await updateUserModules(axiosInstance, updated);
            setModules(updated);
            closeExamModal();
            fetchUserInfo();
        } catch (e) {
            console.error("Fehler beim Speichern der Prüfung: ", e);
        }
    };

    return (
        <div className="lg:w-[60%] w-[80%] sm:px-8 mb-16 justify-center mt-8">
            <div className="w-full md:px-16">
                <p className="text-2xl font-bold text-white text-left lg:mt-4 mt-16 mb-7">Prüfungstermine</p>
                <table className="w-full border-collapse hidden md:table">
                    <tbody>
                    {modules.map((subject, idx) => (
                        <tr key={idx}>
                            <td className="px-1 py-1 text-[#9B9B9B]">{subject.name}</td>
                            <td className="px-1 py-1 text-[#2AB19D]">{subject.examDate ?? '--'}</td>
                            <td className="px-1 py-1 text-[#9B9B9B]">{subject.examTime ?? '--'}</td>
                            <td className="px-1 py-1 text-[#9B9B9B]">{subject.examLoc ?? '--'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="md:hidden space-y-4">
                    {modules.map((subject, idx) => (
                        <div key={idx} className="p-3 shadow-sm">
                            <p className="text-[#9B9B9B]">{subject.name}</p>
                            <p className="text-[#2AB19D] inline">{subject.examDate ?? '--'}</p>
                            <p className="text-[#9B9B9B] inline ml-2">
                                {subject.examTime ?? '--'} {subject.examLoc ?? ''}
                            </p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={openExamModal}
                    className="mt-4 bg-[#56A095] text-white py-2 px-4 rounded-lg hover:bg-[#42907a]"
                >
                    Prüfungstermine bearbeiten
                </button>

                <p className="text-2xl font-bold text-white text-left mt-9 mb-4">Lerngruppen in dieser Woche</p>
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
                            <p className="text-[#9B9B9B]">{meeting.module}</p>
                            <p className="text-[#2AB19D] inline">{new Date(meeting.dateFrom).toLocaleDateString()}</p>
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
                {modules.map((subject, index) => (
                    <div key={index} className="mb-6">
                        <p className="text-m text-[#9B9B9B]">{subject.name}</p>
                        <div onClick={() => openProgressModal(subject.name)}>
                            <ProgressBar progress={calculateProgress(subject)}/>
                        </div>
                    </div>
                ))}

                {isProgressModalOpen && activeModule && (
                    <ModuleProgressSettings
                        onClose={closeProgressModal}
                        module={activeModule}
                        allUserModules={modules}
                    />
                )}
                {isExamModalOpen && (
                    <ExamDateModal
                        isOpen={isExamModalOpen}
                        modules={modules}
                        onClose={closeExamModal}
                        onSubmit={handleAddExam}
                    />
                )}
            </div>
        </div>
    );
}