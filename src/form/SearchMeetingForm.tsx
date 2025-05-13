import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Select,
    MenuItem,
    SelectChangeEvent,
    Grid2
} from "@mui/material";
import CloseIconPath from '../data/close_icon_red.png';
import {getModules} from "../api/ModuleApi";
import axiosInstance from "../AxiosConfig";
import {getMeetingsForModule} from "../api/MeetingApi";
import {MeetingDto} from "../dtos/MeetingDto";
import MeetingSearchResult from "../components/meeting/MeetingSearchResult";
import {ModuleDto} from "../dtos/ModuleDto";

interface MeetingFormProps {
    open: boolean;
    onClose: () => void;
}

export function SearchMeetingForm({open, onClose}: MeetingFormProps) {
    const [modulNames, setModuleNames] = useState<ModuleDto[]>([]);
    const [meetings, setMeetings] = useState<MeetingDto[]>([]);
    const [module, setModule] = useState<string | undefined>();

    const fetchModuleNames = async () => {
        try {
            const response = await getModules(axiosInstance);
            setModuleNames(response);
        } catch (error) {
            console.error("Error fetching user modules:" + error);
        }
    }

    const fetchMeetings = async () => {
        try {
            if (module === undefined) {
                return;
            }
            const response = await getMeetingsForModule(axiosInstance, module);
            setMeetings(response);
        } catch (error) {
            console.error("Fehler beim Abrufen der Meetings: " + error);
        }
    };

    useEffect(() => {
        fetchModuleNames();
    }, [])

    useEffect(() => {
        fetchMeetings();
    }, [module])

    const handleSelectChange = (event: SelectChangeEvent) => {
        setModule(event.target.value as string);
    };

    return <Dialog open={open} onClose={onClose} sx={{
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "70%",
                maxWidth: "90%",
                minWidth: "350px",
                bgcolor: "#1C212C",
                padding: "8px",
                height: "80%",
            },
        },
    }}>
        <DialogTitle sx={{color: "#FFFFFF", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <span className={"font-bold text-2xl"}>Lernsession finden</span>
            <IconButton
                aria-label="close"
                onClick={onClose}
                size={"large"}
                sx={{color: "#FFFFFF"}}
            >
                <img src={CloseIconPath} alt="close" style={{width: "16px", height: "16px"}}/>
            </IconButton>
        </DialogTitle>

        <DialogContent>
            <form className={"overflow-y-visible"} onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                if (!form.checkValidity()) {
                    console.error("Bitte alle erforderlichen Felder ausfüllen!");
                    return;
                }
            }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant={"outlined"}
                    label="Modul"
                    value={module ? module : ""}
                    onChange={handleSelectChange}
                    sx={{width: "50%", minWidth: "240px", color: "#ffffff", bgcolor: "#333C4F", borderColor: "#333C4F"}}
                >
                    {modulNames.map((module, i) => (
                        <MenuItem
                            key={i}
                            value={module.name}
                        >
                            {module.name}
                        </MenuItem>
                    ))}
                </Select>
                <Grid2 container spacing={3} className={"my-5 overflow-y-scroll"}>
                    {meetings.map((meeting) => (
                        <Grid2 size={{xs: 12, lg: 4, md: 6}} key={meeting.id}>
                            <MeetingSearchResult meeting={meeting}/>
                        </Grid2>
                    ))}
                </Grid2>

            </form>
        </DialogContent>
    </Dialog>
}