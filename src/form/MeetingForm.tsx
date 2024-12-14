import React from 'react';
import { Dialog, DialogActions, DialogContent} from "@mui/material";
import {CuteButton} from "../components/CuteButton";

interface MeetingFormProps {
    open: boolean;
    onClose: () => void;
}

export function MeetingForm({ open, onClose }: MeetingFormProps)  {

    return <Dialog open={open} onClose={onClose} sx={{
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "50vw",
                minWidth: "250px"
            },
        },
    }}>
        <DialogContent>
            <form onSubmit={() => {}}>
                (//TODO add form stuff)
            </form>
        </DialogContent>
        <DialogActions>
            <CuteButton onClick={onClose} text={"Abbrechen"} textColor={"#CAE8FF"} bgColor={"#425E74"} size={"text-base"}/>
            <CuteButton onClick={() => {}} text={"Speichern"} textColor={"#DCFFFA"} bgColor={"#506D69"} size={"text-2xl"}/>
        </DialogActions>
    </Dialog>
}