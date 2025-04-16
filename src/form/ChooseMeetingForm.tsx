import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIconPath from "../data/close_icon_red.png";
import React from "react";
import {CuteButton} from "../components/CuteButton";

export function ChooseMeetingForm(props: {
    onClose: () => void,
    setOnlyThisMeeting: React.Dispatch<React.SetStateAction<boolean>>;
    openMeetingForm: () => void;
}) {

    return (
        <Dialog open={true} sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    minWidth: "350px",
                    bgcolor: "#1C212C",
                    padding: "8px",
                },
            },
        }}>
            <DialogTitle
                sx={{color: "#FFFFFF", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span
                    className={"font-bold text-2xl"}>Nur dieses Meeting oder alle Meetings in der Reihe bearbeiten?</span>
                <IconButton
                    aria-label="close"
                    onClick={props.onClose}
                    size={"large"}
                    sx={{color: "#FFFFFF"}}
                >
                    <img src={CloseIconPath} alt="close" style={{width: "16px", height: "16px"}}/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div
                    className={"flex sm:flex-row flex-col gap-4 justify-between sm:items-center items-stretch w-full pr-[40px]"}>
                    <CuteButton bgColor={"#598BB1"} textColor={"#e6ebfc"} text={"Nur dieses Meeting"}
                                classname={"md:text-lg text-base"}
                                onClick={() => {
                                    props.setOnlyThisMeeting(true);
                                    props.onClose();
                                    props.openMeetingForm();
                                }}/>
                    <CuteButton bgColor={"#598BB1"} textColor={"#e6ebfc"} text={"Alle Meetings aus der Reihe"}
                                classname={"md:text-lg text-base"}
                                onClick={() => {
                                    props.setOnlyThisMeeting(false);
                                    props.onClose();
                                    props.openMeetingForm();
                                }}/>
                </div>
            </DialogContent>
        </Dialog>
    )
}