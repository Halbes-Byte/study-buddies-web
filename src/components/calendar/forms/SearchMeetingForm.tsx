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
import CloseIconPath from '../../../data/close_icon_red.png';
import {getMeetingsForModule} from '../../../api/MeetingApi';
import axiosInstance from '../../../auth/AxiosConfig';
import {MeetingDto} from '../../../dtos/MeetingDto';
import GroupedMeeting from '../meeting/GroupedMeeting';
import {getUser} from "../../../api/UserApi";
import {UserModule} from "../../../dtos/ModuleDto";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function SearchMeetingForm({open, onClose}: Props) {
    const [modules, setModules] = useState<UserModule[]>([]);
    const [meetings, setMeetings] = useState<MeetingDto[]>([]);
    const [selectedModule, setSelectedModule] = useState<string>("");

    useEffect(() => {
        getUser(axiosInstance)
            .then(res => setModules(res.modules))
            .catch(err => console.error('Fehler beim Laden der Module:', err));
    }, []);

    useEffect(() => {
        if (!selectedModule) return;
        getMeetingsForModule(axiosInstance, selectedModule)
            .then(setMeetings)
            .catch(err => console.error('Fehler beim Laden der Meetings:', err));
    }, [selectedModule]);

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
            <DialogTitle sx={{
                    color: '#FFFFFF',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <span className="font-bold text-2xl">Lernsession finden</span>
                <IconButton onClick={closeAndReset} size="large" sx={{color: '#FFFFFF'}}>
                    <img src={CloseIconPath} alt="Schließen" style={{width: 16, height: 16}}/>
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <form className="overflow-y-visible">
                    <Select
                        value={selectedModule}
                        onChange={(e: SelectChangeEvent) => setSelectedModule(e.target.value)}
                        variant="outlined"
                        displayEmpty
                        renderValue={(selected) => {
                            if (!selected) {
                                return <span style={{ color: '#aaa' }}>Wähle ein Modul</span>;
                            }
                            return selected;
                        }}
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
