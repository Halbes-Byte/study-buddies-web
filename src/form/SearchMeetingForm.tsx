import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import CloseIconPath from '../data/close_icon_red.png';
import {getMeetingsForModule} from '../api/MeetingApi';
import axiosInstance from '../AxiosConfig';
import {MeetingDto} from '../dtos/MeetingDto';
import GroupedMeeting from '../components/meeting/GroupedMeeting';
import {getUser} from "../api/UserApi";
import {UserModule} from "../dtos/ModuleDto";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function SearchMeetingForm({open, onClose}: Props) {
    const [modules, setModules] = useState<UserModule[]>([]);
    const [meetings, setMeetings] = useState<MeetingDto[]>([]);
    const [selectedModule, setSelectedModule] = useState<string>("");

    useEffect(() => {
        const loadModules = async () => {
            try {
                const res = await getUser(axiosInstance);
                setModules(res.modules);
            } catch (err) {
                console.error('Fehler beim Laden der Module:', err);
            }
        };
        loadModules();
    }, []);

    useEffect(() => {
        const loadMeetings = async () => {
            if (selectedModule === "") return;
            try {
                const res = await getMeetingsForModule(axiosInstance, selectedModule);
                setMeetings(res);
            } catch (err) {
                console.error('Fehler beim Laden der Meetings:', err);
            }
        };
        loadMeetings();
    }, [selectedModule]);

    const handleModuleChange = (event: SelectChangeEvent) => {
        setSelectedModule(event.target.value);
    };

    const closeAndReset = () => {
        setSelectedModule("");
        setMeetings([]);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={closeAndReset}
            sx={{
                '& .MuiDialog-container .MuiPaper-root': {
                    width: '70%',
                    maxWidth: '90%',
                    minWidth: '350px',
                    bgcolor: '#1C212C',
                    padding: '8px',
                    height: '80%',
                },
            }}
        >
            <DialogTitle
                sx={{
                    color: '#FFFFFF',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <span className="font-bold text-2xl">Lernsession finden</span>
                <IconButton onClick={closeAndReset} size="large" sx={{color: '#FFFFFF'}}>
                    <img src={CloseIconPath} alt="Schließen" style={{width: 16, height: 16}}/>
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <form className="overflow-y-visible">
                    <Select
                        value={selectedModule}
                        onChange={handleModuleChange}
                        variant="outlined"
                        sx={{
                            width: '50%',
                            minWidth: 240,
                            color: '#ffffff',
                            bgcolor: '#333C4F',
                            borderColor: '#333C4F',
                        }}
                    >
                        {modules.map((mod, i) => (
                            <MenuItem key={i} value={mod.name}>
                                {mod.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <GroupedMeeting meetings={meetings}/>
                </form>
            </DialogContent>
        </Dialog>
    );
}
