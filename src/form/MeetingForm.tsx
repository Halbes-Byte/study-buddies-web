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

interface MeetingFormProps {
    open: boolean;
    onClose: () => void;
}

dayjs.locale('de');

export function MeetingForm({open, onClose}: MeetingFormProps) {

    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [meetingRoom, setMeetingRoom] = useState('');
    const [date1, setDate1] = useState<Dayjs | null>(dayjs());
    const [date2, setDate2] = useState<Dayjs | null>(dayjs());

    const handleDate1Change = (newDate: Dayjs | null) => {
        console.log(newDate);
        if (newDate) {
            setDate1(newDate);
            setDate2(newDate);
        }
        console.log(date2);
        console.log(date1);

    };

    const handleDate2Change = (newDate: Dayjs | null) => {
        if (newDate) {
            setDate2(newDate);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const meetingData = {
            title: meetingTitle,
            description: meetingDescription,
            room: meetingRoom,
        };

        try {
            const response = await fetch('http://localhost:8080/pfadangeben', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meetingData),
            });

            if (!response.ok) {
                throw new Error('Fehler beim Speichern des Meetings');
            }

            alert('Meeting erfolgreich gespeichert!');
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
            },
        },
    }}>
        <DialogTitle sx={{color: "#FFFFFF", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <span>Neues Meeting</span>
        </DialogTitle>

        <DialogContent>
            <form onSubmit={() => {
            }}>
                <label htmlFor="meeting-title" className="block text-lg font-medium text-white">Titel / Fach</label>
                <input
                    id="meeting-title"
                    type="text"
                    placeholder="Hier Titel oder Fach eingeben"
                    className="mt-1 text-gray-300 block bg-[#333C4F] w-full px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                />

                <label htmlFor="meeting-description"
                       className="block text-lg font-medium text-white">Beschreibung</label>
                <input
                    id="meeting-description"
                    type="text"
                    placeholder="Hier könnte Ihre Beschreibung stehen"
                    className="mt-1 text-gray-300 block bg-[#333C4F] w-full px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                    value={meetingDescription}
                    onChange={(e) => setMeetingDescription(e.target.value)}
                />


                <CuteButton text={"Link hinzufügen"} textColor={"#CAE8FF"} bgColor={"#3D6C65"} size={"text-base"}/>

                {/* TODO dieser Button tut noch nichts*/}


                <label htmlFor="Time Span" className="mt-8 block text-lg font-medium text-white">Zeitraum</label>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="de"
                    localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                    <div className={"flex-row flex mt-2 w-80 items-center gap-2"}>

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
                                            color: '#9fa3a8',
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
                                            color: '#9fa3a8',
                                        }
                                    },
                                }
                            }}
                            ampm={false} format="HH:mm" defaultValue={dayjs().hour(12).minute(0).second(0)}/>
                    </div>
                </LocalizationProvider>

                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="de"
                    localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                    <div className={"flex-row mt-4 flex w-80 h-12 items-center gap-2"}>
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
                                            color: '#9fa3a8',
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
                                            color: '#9fa3a8',
                                        }
                                    },
                                }
                            }}
                            ampm={false} format="HH:mm" defaultValue={dayjs().hour(12).minute(0).second(0)}/>
                    </div>
                </LocalizationProvider>
                <div className={"flex-row mt-4 flex h-12 items-center gap-2"}>

                    <label htmlFor="Repeat"
                           className="mr-2 block text-bs font-medium text-white text-center">Wiederholen</label>
                    <select
                        id="meeting-dropdown"
                        className="p-6 text-gray-300 block bg-[#333C4F] w-1/3 px-2 py-1 text-bs border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                        style={{
                            borderRadius: '20px',
                        }}
                    >
                        <option value="never">Nie</option>
                        <option value="daily">Täglich</option>
                        <option value="weekly">Wöchentlich</option>
                        <option value="monthly">Monatlich</option>
                    </select>
                </div>

                <label htmlFor="room" className="block text-lg font-medium text-white">Raum</label>
                <input
                    id="room"
                    type="text"
                    placeholder="Format: XX.129"
                    className="mt-1 text-gray-300 block bg-[#333C4F] w-1/3 px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-550 placeholder:text-xs"
                    value={meetingRoom}
                    onChange={(e) => setMeetingRoom(e.target.value)}
                />
            </form>
        </DialogContent>
        <DialogActions>
            <CuteButton onClick={onClose} text={"Abbrechen"} textColor={"#CAE8FF"} bgColor={"#425E74"}
                        size={"text-base"}/>
            <CuteButton onClick={() => {
            }} text={"Speichern"} textColor={"#DCFFFA"} bgColor={"#506D69"} size={"text-2xl"}/>
        </DialogActions>
    </Dialog>
}