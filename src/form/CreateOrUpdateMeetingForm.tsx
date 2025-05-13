import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogTitle, DialogContent} from "@mui/material";
import {CuteButton} from "../components/CuteButton";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {deDE} from "@mui/x-date-pickers/locales";
import {createMeeting, deleteMeeting, updateMeeting} from "../api/MeetingApi";
import {CreateMeetingDto, MeetingDto} from "../dtos/MeetingDto";
import axiosInstance from "../AxiosConfig";
import {getModules} from "../api/ModuleApi";
import {ChangeType} from "../enum/ChangeType";
import {ModuleDto} from "../dtos/ModuleDto";

interface MeetingFormProps {
    open: boolean;
    onClose: () => void;
    meeting?: MeetingDto;
    onlyThisMeeting?: boolean
}

dayjs.locale('de');

export function CreateOrUpdateMeetingForm({open, onClose, meeting, onlyThisMeeting}: MeetingFormProps) {
    const dateFrom = dayjs(meeting?.dateFrom, "D.M.YYYY, H:mm:ss");
    const dateUntil = dayjs(meeting?.dateUntil, "D.M.YYYY, H:mm:ss");

    const [meetingTitle, setMeetingTitle] = useState(meeting ? meeting.title : "");
    const [repeatable, setRepeatable] = useState(meeting ? meeting.repeatable : "never");
    const [meetingDescription, setMeetingDescription] = useState(meeting ? meeting.description : '');
    const [meetingRoom, setMeetingRoom] = useState(meeting ? meeting.place : '');
    const [date1, setDate1] = useState<Dayjs>(meeting ? dateFrom : dayjs());
    const [time1, setTime1] = useState<Dayjs>(meeting ? dateFrom : dayjs().hour(12).minute(0).second(0));
    const [date2, setDate2] = useState<Dayjs>(meeting ? dateUntil : dayjs());
    const [time2, setTime2] = useState<Dayjs>(meeting ? dateUntil : dayjs().hour(13).minute(0).second(0));
    const [moduleNames, setModuleNames] = useState<ModuleDto[]>([]);

    useEffect(() => {
        fetchModuleNames();
    }, [])

    const fetchModuleNames = async () => {
        try {
            const response = await getModules(axiosInstance);
            setModuleNames(response);
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

    const handleDate2Change = (newDate: Dayjs | null) => {
        if (newDate) {
            setDate2(newDate);
        }
    };
    const handleTime1Change = (newTime: Dayjs | null) => {
        if (newTime) {
            setTime1(newTime);
            setTime2(newTime.add(1, 'hour'));
        }
    };

    const handleTime2Change = (newTime: Dayjs | null) => {
        if (newTime) {
            setTime2(newTime);
        }
    };

    const handleRepeatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRepeatable(event.target.value);
    };

    const handleDelete = async () => {
        try {
            await deleteMeeting(axiosInstance, meeting!!.id);
            closeAndReset();
        } catch (error) {
            console.error('Fehler:', error);
            alert('Es gab einen Fehler beim Löschen des Meetings.');
        }
    }

    const handleSave = async () => {
        var changeType;
        if (onlyThisMeeting)
            changeType = ChangeType.OCCURRENCE;
        else
            changeType = ChangeType.SERIES;

        const meetingData: CreateMeetingDto = {
            title: meetingTitle,
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
            alert('Es gab einen Fehler beim Speichern des Meetings.');
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
                    console.error("Bitte alle erforderlichen Felder ausfüllen!");
                    return;
                }
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
                       className="font-semibold block text-lg text-white">Beschreibung</label>
                <textarea
                    id="meeting-description"
                    rows={3}
                    placeholder="Hier könnte Ihre Beschreibung stehen"
                    className="ml-5 resize-none mt-1 text-gray-300 block bg-[#333C4F] w-11/12 px-10 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs placeholder:py-1 py-2"
                    value={meetingDescription}
                    onChange={(e) => setMeetingDescription(e.target.value)}
                />


                <label htmlFor="Time Span"
                       className="font-semibold mt-8 block text-lg text-white">Zeitraum</label>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="de"
                    localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                    <div className={"ml-5 flex-row flex mt-2 w-80 items-center gap-2 md:mb-0 mb-8"}>

                        <label htmlFor="From"
                               className="mr-2 block text-bs font-medium text-white text-center">Von</label>
                        <div className="flex md:flex-row flex-col gap-2">
                            <DatePicker
                                className="mt-1 block bg-[#333C4F] w-36 px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                                sx={{
                                    '& .MuiIconButton-root': {
                                        color: '#9fa3a8',
                                    },
                                }}
                                minDate={dayjs()}
                                slotProps={{
                                    textField: {
                                        size: 'small', variant: 'standard', InputProps: {
                                            disableUnderline: true,
                                            sx: {
                                                paddingLeft: '8px',
                                                paddingRight: '8px',
                                                color: '#e2e8f0',
                                            }
                                        },
                                    }
                                }}
                                format="DD.MM.YYYY" defaultValue={date1} value={date1}
                                onChange={handleDate1Change}/>
                            <TimePicker
                                className="mt-1 block bg-[#333C4F] w-24 px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                                sx={{
                                    '& .MuiIconButton-root': {
                                        color: '#9fa3a8',
                                    },
                                }}
                                slotProps={{
                                    textField: {
                                        size: 'small', variant: 'standard', InputProps: {
                                            disableUnderline: true,
                                            sx: {
                                                paddingLeft: '8px',
                                                paddingRight: '8px',
                                                color: '#e2e8f0',
                                            }
                                        },
                                    }
                                }}
                                ampm={false} format="HH:mm" value={time1} onChange={handleTime1Change}/>
                        </div>
                    </div>
                </LocalizationProvider>

                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="de"
                    localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                    <div className={"ml-5 flex-row mt-4 flex w-80 h-12 items-center gap-2 md:mb-0 mb-8"}>
                        <label htmlFor="To"
                               className="mr-3 block text-bs font-medium text-white ">Bis</label>
                        <div className="flex md:flex-row flex-col gap-2 ">
                            <DatePicker
                                sx={{
                                    '& .MuiIconButton-root': {
                                        color: '#9fa3a8',
                                    },
                                }}
                                minDate={dayjs()}
                                className="mt-1 block bg-[#333C4F] w-36 px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                                slotProps={{
                                    textField: {
                                        size: 'small', variant: 'standard', InputProps: {
                                            disableUnderline: true,
                                            sx: {
                                                paddingLeft: '8px',
                                                paddingRight: '8px',
                                                color: '#e2e8f0',
                                            }
                                        },
                                    }
                                }}
                                format="DD.MM.YYYY" defaultValue={date2} value={date2}
                                onChange={handleDate2Change}/>
                            <TimePicker
                                sx={{
                                    '& .MuiIconButton-root': {
                                        color: '#9fa3a8',
                                    },
                                }}
                                className="mt-1 block bg-[#333C4F] w-24 px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                                slotProps={{
                                    textField: {
                                        size: 'small', variant: 'standard', InputProps: {
                                            disableUnderline: true,
                                            sx: {
                                                paddingLeft: '8px',
                                                paddingRight: '8px',
                                                color: '#e2e8f0',
                                            }
                                        },
                                    }
                                }}
                                ampm={false} format="HH:mm" value={time2} onChange={handleTime2Change}/>
                        </div>
                    </div>
                </LocalizationProvider>
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
                        {meeting && (
                            <div className={"flex lg:justify-start justify-end w-full"}>
                                <CuteButton onClick={handleDelete} text={"Meeting Löschen"} textColor={"#f2f2f2"}
                                            bgColor={"#974242"}
                                            classname={"text-xl"}/>
                            </div>
                        )}
                        <div className={"gap-2 ml-auto flex items-center"}>
                            <CuteButton onClick={closeAndReset} text={"Abbrechen"} bgColor={"#598BB1"}
                                        textColor={"#e6ebfc"}
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