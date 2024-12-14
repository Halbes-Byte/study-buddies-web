import React from 'react';
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

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
            <Button onClick={onClose} variant={"outlined"}>Abbrechen</Button>
            <Button type={"submit"} variant={"contained"}>Speichern</Button>
        </DialogActions>
    </Dialog>
}