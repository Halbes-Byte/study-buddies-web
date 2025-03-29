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

interface MeetingFormProps {
    open: boolean;
    onClose: () => void;
    meeting?: MeetingDto;
}

dayjs.locale('de');

export function MeetingForm({open, onClose, meeting}: MeetingFormProps) {
    const dateFrom = dayjs(meeting?.date_from, "D.M.YYYY, H:mm:ss");
    const dateUntil = dayjs(meeting?.date_until, "D.M.YYYY, H:mm:ss");

    const [meetingTitle, setMeetingTitle] = useState(meeting ? meeting.title : "");
    const [repeatable, setRepeatable] = useState(meeting ? meeting.repeatable : "never");
    const [meetingDescription, setMeetingDescription] = useState(meeting ? meeting.description : '');
    const [meetingRoom, setMeetingRoom] = useState(meeting ? meeting.place : '');
    const [date1, setDate1] = useState<Dayjs>(meeting ? dateFrom : dayjs());
    const [time1, setTime1] = useState<Dayjs>(meeting ? dateFrom : dayjs().hour(12).minute(0).second(0));
    const [date2, setDate2] = useState<Dayjs>(meeting ? dateUntil : dayjs());
    const [time2, setTime2] = useState<Dayjs>(meeting ? dateUntil : dayjs().hour(13).minute(0).second(0));
    const [moduleNames, setModuleNames] = useState<string[]>([]);

    useEffect(() => {
        fetchModuleNames();
    })

    const fetchModuleNames = async () => {
        try {
            const response = await getModules(axiosInstance);
            setModuleNames(response);
        } catch (error) {
            //alert("Error fetching user modules:" + error);
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
        const meetingData: CreateMeetingDto = {
            title: meetingTitle,
            description: meetingDescription,
            place: meetingRoom,
            date_from: date1.hour(time1.hour()).minute(time1.minute()).format("DD-MM-YYYY:HH:mm") || "",
            date_until: date2.hour(time2.hour()).minute(time2.minute()).format("DD-MM-YYYY:HH:mm") || "",
            repeatable: repeatable,
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
                minWidth: "300px",
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
                handleSave();
            }}>
                <label htmlFor="meeting-title" className="font-semibold block text-lg text-white">Modulname</label>


                <div>
                    <input
                        id="meeting-title"
                        list="fruits"
                        required={true}
                        type="text"
                        placeholder="Exakten Modulnamen eingeben oder auswählen"
                        className="mx-5 mt-1 text-gray-300 block bg-[#333C4F] w-11/12 px-10 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                        value={meetingTitle}
                        onChange={(e) => setMeetingTitle(e.target.value)}
                    />
                    <datalist id="fruits">
                        {moduleNames.map((option) => (
                            <option key={option} className={"w-full"} value={option}/>
                        ))}
                    </datalist>
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
                        <option value="never">Nie</option>
                        <option value="daily">Täglich</option>
                        <option value="weekly">Wöchentlich</option>
                        <option value="monthly">Monatlich</option>
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
                    <div className={"flex flex-row gap-4 w-full items-center"}>
                        {meeting && (
                            <CuteButton onClick={handleDelete} text={"Meeting Löschen"} textColor={"#f2f2f2"}
                                        bgColor={"#974242"}
                                        classname={"text-xl"}/>
                        )}
                        <div className={"gap-2 ml-auto flex items-center"}>
                            <CuteButton onClick={closeAndReset} text={"Abbrechen"} textColor={"#e6ebfc"}
                                        bgColor={"#425E74"}
                                        classname={"text-base"}/>
                            <CuteButton type={"submit"} text={"Speichern"} textColor={"#e3f1ef"} bgColor={"#506D69"}
                                        classname={"text-2xl"}/>
                        </div>
                    </div>
                </DialogActions>
            </form>
        </DialogContent>
    </Dialog>
}