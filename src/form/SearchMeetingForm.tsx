import React, {useEffect, useState} from 'react';
import {Dialog, DialogTitle, DialogContent, IconButton, Select, MenuItem} from "@mui/material";
import dayjs from 'dayjs';
import {MeetingDto} from "../dtos/MeetingDto";
import CloseIconPath from '../data/close_icon_red.png';
import {getModules} from "../api/ModuleApi";
import axiosInstance from "../AxiosConfig";

interface MeetingFormProps {
    open: boolean;
    onClose: () => void;
    meeting?: MeetingDto;
}

dayjs.locale('de');

export function SearchMeetingForm({open, onClose, meeting}: MeetingFormProps) {
    const [modulNames, setModuleNames] = useState<string[]>([]);

    const fetchModuleNames = async () => {
        try {
            const response = await getModules(axiosInstance);
            setModuleNames(response);
        } catch (error) {
            //alert("Error fetching user modules:" + error);
        }
    }

    useEffect(() => {
        fetchModuleNames();
    })

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
            <form className={"overflow-x-hidden"} onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                if (!form.checkValidity()) {
                    alert("Bitte alle erforderlichen Felder ausfüllen!");
                    return;
                }
            }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant={"filled"}
                    label="Modul"
                    sx={{width: "50%", minWidth: "240px", color: "#ffffff", bgcolor: "#333C4F"}}
                >
                    {modulNames.map((module, i) => (
                        <MenuItem
                            key={i}
                            value={module}
                        >
                            {module}
                        </MenuItem>
                    ))}

                </Select>
            </form>
        </DialogContent>
    </Dialog>
}