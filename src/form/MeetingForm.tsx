import React, {useState} from 'react';
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
import {createMeeting} from "../api/MeetingApi";
import axios from "axios";
import {useForm} from "@pankod/refine-react-hook-form";
import {defaultMeetingDto, MeetingDto} from "../dtos/MeetingDto";
import {HttpError} from "@refinedev/core";

interface MeetingFormProps {
    open: boolean;
    onClose: () => void;
}

dayjs.locale('de');

export function MeetingForm({open, onClose}: MeetingFormProps) {

    const [meetingTitle, setMeetingTitle] = useState('');
    const [repeatable, setRepeatable] = useState('never');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [meetingRoom, setMeetingRoom] = useState('');
    const [date1, setDate1] = useState<Dayjs>(dayjs());
    const [time1, setTime1] = useState<Dayjs>(dayjs().hour(12).minute(0).second(0));
    const [date2, setDate2] = useState<Dayjs>(dayjs());
    const [time2, setTime2] = useState<Dayjs>(dayjs().hour(12).minute(0).second(0));

    const methods = useForm<MeetingDto, HttpError>({
        refineCoreProps: {
            redirect: "show",
        },
        defaultValues: defaultMeetingDto
    });
    const {
        handleSubmit,
        refineCore: {onFinish},
    } = methods;

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
            setTime2(newTime);
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

    const handleClick = async () => {
        await handleSubmit(async (values) => {
            await onFinish({
                ...values,
            });
        })();

        const meetingData: MeetingDto = {
            title: meetingTitle,
            description: meetingDescription,
            place: meetingRoom,
            date_from: date1.hour(time1.hour()).minute(time1.minute()).format("DD-MM-YYYY:HH:mm") || "",
            date_until: date2.hour(time2.hour()).minute(time2.minute()).format("DD-MM-YYYY:HH:mm") || "",
            repeatable: repeatable,
        };

        try {
            await createMeeting(axios, meetingData);
            onClose();
        } catch (error) {
            console.error('Fehler:', error);
            alert('Es gab einen Fehler beim Speichern des Meetings.');
        }
    };


    return <Dialog open={open} onClose={onClose} sx={{
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "50vw",
                minWidth: "250px",
                bgcolor: "#1C212C",
                padding: "8px",
            },
        },
    }}>
        <DialogTitle sx={{color: "#FFFFFF", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <span className={"font-bold text-2xl"}>Neues Meeting</span>
        </DialogTitle>

        <DialogContent>
            <form onSubmit={() => {
            }}>
                <label htmlFor="meeting-title" className="font-semibold block text-lg text-white">Titel /
                    Fach</label>
                <input
                    id="meeting-title"
                    type="text"
                    placeholder="Hier Titel oder Fach eingeben"
                    className="mx-5 mt-1 text-gray-300 block bg-[#333C4F] w-11/12 px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                />

                <label htmlFor="meeting-description"
                       className="font-semibold block text-lg text-white">Beschreibung</label>
                <textarea
                    id="meeting-description"
                    placeholder="Hier könnte Ihre Beschreibung stehen"
                    className="ml-5 mt-1 text-gray-300 block bg-[#333C4F] w-11/12 px-2 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs placeholder:pl-3 pl-4 py-2"
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
                    <div className={"ml-5 flex-row flex mt-2 w-80 items-center gap-2"}>

                        <label htmlFor="From"
                               className="mr-2 block text-bs font-medium text-white text-center">Von</label>
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
                            format="DD.MM.YYYY" defaultValue={date1} value={date1} onChange={handleDate1Change}/>
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
                </LocalizationProvider>

                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="de"
                    localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                    <div className={"ml-5 flex-row mt-4 flex w-80 h-12 items-center gap-2"}>
                        <label htmlFor="To"
                               className="mr-3 block text-bs font-medium text-white ">Bis</label>
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
                            format="DD.MM.YYYY" defaultValue={date2} value={date2} onChange={handleDate2Change}/>
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
                    type="text"
                    placeholder="Format: XX.129"
                    className="ml-5 mt-1 text-gray-300 block bg-[#333C4F] w-1/3 px-2 py-1 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-550 placeholder:text-xs"
                    value={meetingRoom}
                    onChange={(e) => setMeetingRoom(e.target.value)}
                />
            </form>
        </DialogContent>
        <DialogActions>
            <CuteButton onClick={onClose} text={"Abbrechen"} textColor={"#CAE8FF"} bgColor={"#425E74"}
                        size={"text-base"}/>
            <CuteButton onClick={handleClick} text={"Speichern"} textColor={"#e3f1ef"} bgColor={"#506D69"}
                        size={"text-2xl"}/>
        </DialogActions>
    </Dialog>
}