import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogTitle, DialogContent} from "@mui/material";
import {CuteButton} from "../../CuteButton";
import {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {createMeeting, updateMeeting} from "../../../api/MeetingApi";
import {CreateMeetingDto, MeetingDto} from "../../../dtos/MeetingDto";
import axiosInstance from "../../../auth/AxiosConfig";
import {ChangeType} from "../../../enum/ChangeType";
import {UserModule} from "../../../dtos/ModuleDto";
import {getUser} from "../../../api/UserApi";
import {TimePickerComponent} from "./TimePickerComponent";

interface MeetingFormProps {
    open: boolean;
    onClose: () => void;
    meeting?: MeetingDto;
    onlyThisMeeting?: boolean
}

dayjs.locale('de');

export function CreateOrUpdateMeetingForm({open, onClose, meeting, onlyThisMeeting}: MeetingFormProps) {
    const [meetingTitle, setMeetingTitle] = useState(meeting ? meeting.module : "");
    const [repeatable, setRepeatable] = useState(meeting ? meeting.repeatable : "never");
    const [meetingDescription, setMeetingDescription] = useState(meeting ? meeting.description : '');
    const [meetingRoom, setMeetingRoom] = useState(meeting ? meeting.place : '');
    const [date1, setDate1] = useState<Dayjs>(meeting ? dayjs(meeting?.dateFrom, "D.M.YYYY, H:mm:ss") : dayjs());
    const [time1, setTime1] = useState<Dayjs>(meeting ? dayjs(meeting?.dateFrom, "D.M.YYYY, H:mm:ss") : dayjs().hour(12).minute(0).second(0));
    const [date2, setDate2] = useState<Dayjs>(meeting ? dayjs(meeting?.dateUntil, "D.M.YYYY, H:mm:ss") : dayjs());
    const [time2, setTime2] = useState<Dayjs>(meeting ? dayjs(meeting?.dateUntil, "D.M.YYYY, H:mm:ss") : dayjs().hour(13).minute(0).second(0));
    const [moduleNames, setModuleNames] = useState<UserModule[]>([]);
    const [descriptionError, setDescriptionError] = useState("");

    useEffect(() => {
        fetchModuleNames();
    }, [])

    const fetchModuleNames = async () => {
        try {
            const response = await getUser(axiosInstance);
            setModuleNames(response.modules);
        } catch (error) {
            console.error("Error fetching user modules:" + error);
        }
    }

    const handleDate1Change = (newDate: Dayjs | null) => {
        if (newDate) {
            setDate1(newDate);
            setDate2(newDate);
        }
    };

    const handleTime1Change = (newTime: Dayjs | null) => {
        if (newTime) {
            setTime1(newTime);
            setTime2(newTime.add(1, 'hour'));
        }
    };

    const handleRepeatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRepeatable(event.target.value);
    };

    const handleSave = async () => {
        const changeType = onlyThisMeeting ? ChangeType.OCCURRENCE : ChangeType.SERIES;

        const meetingData: CreateMeetingDto = {
            module: meetingTitle,
            description: meetingDescription,
            place: meetingRoom,
            dateFrom: date1.hour(time1.hour()).minute(time1.minute()).format("DD-MM-YYYY:HH:mm") || "",
            dateUntil: date2.hour(time2.hour()).minute(time2.minute()).format("DD-MM-YYYY:HH:mm") || "",
            repeatable: repeatable,
            changeType: changeType
        };

        try {
            if (meeting) {
                await updateMeeting(axiosInstance, meeting.id, meetingData);
            } else {
                await createMeeting(axiosInstance, meetingData);
            }
            closeAndReset();
        } catch (error) {
            console.error('Es gab einen Fehler beim Speichern des Meetings.');
        }
    };

    const closeAndReset = () => {
        resetFormFields();
        onClose();
    }

    const resetFormFields = () => {
        setMeetingTitle("");
        setMeetingDescription("");
        setMeetingRoom("");
        setDate1(dayjs);
        setDate2(dayjs);
        setTime1(dayjs);
        setTime2(dayjs);
        setRepeatable("never");
    };

    return <Dialog open={open} onClose={onClose} sx={{
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "50vw",
                minWidth: "350px",
                bgcolor: "#1C212C",
                padding: "8px",
            },
        },
    }}>
        <DialogTitle sx={{color: "#FFFFFF", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <span className={"font-bold text-2xl"}>Neues Meeting</span>
        </DialogTitle>

        <DialogContent>
            <form className={"overflow-x-hidden"} onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                if (!form.checkValidity()) {
                    alert("Bitte alle erforderlichen Felder ausfüllen!");
                    return;
                }
                if (meetingDescription.length > 255) {
                    setDescriptionError("Die Beschreibung ist zu lang (max 255 Zeichen).");
                    return;
                } else
                    setDescriptionError("");
                handleSave();
            }}>
                <label htmlFor="meeting-title" className="font-semibold block text-lg text-white">Modulname</label>
                <div>
                    <select
                        id="meeting-title"
                        required
                        className="mx-5 mt-1 text-gray-300 block bg-[#333C4F] w-11/12 px-10 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F]"
                        value={meetingTitle}
                        onChange={(e) => setMeetingTitle(e.target.value)}
                    >
                        <option value="" disabled>Modul auswählen</option>
                        {moduleNames.map((module, index) => (
                            <option key={index} value={module.name}>
                                {module.name}
                            </option>
                        ))}
                    </select>
                </div>


                <label htmlFor="meeting-description"
                       className="font-semibold block text-lg text-white">Beschreibung </label>
                <textarea
                    id="meeting-description"
                    rows={3}
                    placeholder="Hier könnte Ihre Beschreibung stehen (max 255 Zeichen)"
                    className="ml-5 resize-none mt-1 text-gray-300 block bg-[#333C4F] w-11/12 px-10 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs placeholder:py-1 py-2"
                    value={meetingDescription}
                    onChange={(e) => setMeetingDescription(e.target.value)}
                />
                <p className={" ml-5 text-red-400"}>{descriptionError}</p>

                <label htmlFor="Time Span"
                       className="font-semibold mt-8 block text-lg text-white">Zeitraum</label>

                <TimePickerComponent time={time1} date={date1} setDate={handleDate1Change} setTime={handleTime1Change} label={"Von"}/>
                <TimePickerComponent time={time2} date={date2} setDate={setDate2} setTime={setTime2} label={"Bis"}/>

                <div className={"ml-5 flex-row mt-1 flex h-12 items-center gap-2"}>

                    <label htmlFor="Repeat"
                           className="mr-2 block text-bs font-medium text-white text-center">Wiederholen</label>
                    <select
                        id="meeting-dropdown"
                        className="p-6 text-gray-300 block bg-[#333C4F] w-1/3 px-2 py-1 text-bs border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                        style={{
                            borderRadius: '20px',
                        }}
                        required={true}
                        value={repeatable}
                        onChange={handleRepeatChange}
                    >
                        <option value="NEVER">Nie</option>
                        <option value="DAILY">Täglich</option>
                        <option value="WEEKLY">Wöchentlich</option>
                        <option value="MONTHLY">Monatlich</option>
                    </select>
                </div>

                <label htmlFor="room" className="font-semibold block text-lg text-white">Raum</label>
                <input
                    id="room"
                    required={true}
                    type="text"
                    className="ml-5 mt-1 text-gray-300 block bg-[#333C4F] w-2/3 px-10 py-1 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-550 placeholder:text-xs"
                    value={meetingRoom}
                    onChange={(e) => setMeetingRoom(e.target.value)}
                />
                <DialogActions>
                    <div className={"flex lg:flex-row gap-4 w-full items-center flex-col"}>
                        <div className={"gap-2 ml-auto flex items-center"}>
                            <CuteButton onClick={closeAndReset} text={"Abbrechen"} bgColor={"#598BB1"}
                                        textColor={"#e6ebfc"} type={"button"}
                                        classname={"md:text-base text-sm"}/>
                            <CuteButton type={"submit"} text={"Speichern"} bgColor={"#56A095"} textColor={"#e8fcf6"}
                                        classname={"md:text-2xl text-xl"}/>
                        </div>
                    </div>
                </DialogActions>
            </form>
        </DialogContent>
    </Dialog>
}