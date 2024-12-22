import React, { useState } from 'react';
import { Dialog, DialogActions, DialogTitle, IconButton, DialogContent} from "@mui/material";
import {CuteButton} from "../components/CuteButton";
import CloseIconPath from '../data/close_icon_red.png';

interface MeetingFormProps {
    open: boolean;
    onClose: () => void;
}

export function MeetingForm({ open, onClose }: MeetingFormProps) {

    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [meetingRoom, setMeetingRoom] = useState('');

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
                bgcolor: "#1C212C",            },
        },
    }}>
  <DialogTitle sx={{ color: "#FFFFFF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Neues Meeting</span>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ color: "#FFFFFF" }}
                >
                    <img src={CloseIconPath} alt="close" style={{ width: "16px", height: "16px" }} />
                </IconButton>
            </DialogTitle>

        <DialogContent>
            <form onSubmit={() => {}}>

            <label htmlFor="meeting-title" className="block text-lg font-medium text-white">Titel / Fach</label>
                <input
                    id="meeting-title"
                    type="text"
                    placeholder="Hier Titel oder Fach eingeben"
                    className="mt-1 block bg-[#333C4F] w-full px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)} 
               />
            

            <label htmlFor="meeting-description" className="block text-lg font-medium text-white">Beschreibung</label>
                <input
                    id="meeting-description"
                    type="text"
                    placeholder="Hier könnte Ihre Beschreibung stehen"
                    className="mt-1 block bg-[#333C4F] w-full px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                    value={meetingDescription}
                    onChange={(e) => setMeetingDescription(e.target.value)} 
                />
            

           
<CuteButton text={"Link hinzufügen"} textColor={"#CAE8FF"} bgColor={"#3D6C65"} size={"text-base"}/> 

{/* dieser Button tut noch nichts*/}



<label htmlFor="Time Span" className="mt-8 block text-lg font-medium text-white">Zeitraum</label>
<select
                id="meeting-dropdown"
                className="mt-1 block bg-[#333C4F] w-1/3 px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                style={{
                    padding: '6px',
                    borderRadius: '20px',
                    fontSize: '16px',
                    width: '100%',
                    marginTop: '10px',
                
                }}
            >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>

            <label htmlFor="room" className="block text-lg font-medium text-white">Raum</label>
                <input
                    id="room"
                    type="text"
                    placeholder="Format: XX.129"
                    className="mt-1 block bg-[#333C4F] w-1/3 px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                    value={meetingRoom}
                    onChange={(e) => setMeetingRoom(e.target.value)}
                />
            </form>
        </DialogContent>
        <DialogActions>
            <CuteButton onClick={onClose} text={"Abbrechen"} textColor={"#CAE8FF"} bgColor={"#425E74"} size={"text-base"}/>
            <CuteButton onClick={() => {}} text={"Speichern"} textColor={"#DCFFFA"} bgColor={"#506D69"} size={"text-2xl"}/>
        </DialogActions>
    </Dialog>
}