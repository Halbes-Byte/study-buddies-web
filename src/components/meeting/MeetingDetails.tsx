import React from 'react';
import '../../styles/Modal.css';
import {CuteButton} from "../CuteButton";
import {CreateMeetingDto} from "../../dtos/MeetingDto";

interface ModalProps {
    isOpen: boolean;
    meeting: CreateMeetingDto | null;
    onClose: () => void;
    openMeetingForm: () => void;
    openChooseMeetingModal: () => void;
}

const MeetingDetails: React.FC<ModalProps> = ({isOpen, meeting, onClose, openMeetingForm, openChooseMeetingModal}) => {
    if (!isOpen || !meeting) return null;

    const updateMeeting = () => {
        onClose();
        if (meeting.repeatable !== "NEVER")
            openChooseMeetingModal();
        else
            openMeetingForm();
    }
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content max-w-[90%] w-[450px]" onClick={(e) => e.stopPropagation()}>

                <h2 className="font-bold text-2xl text-white mb-4">{meeting.title}</h2>

                <div className="flex flex-col gap-4 mb-4">
                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Start:</strong> {meeting.dateFrom}
                    </p>
                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Ende:</strong> {meeting.dateUntil}
                    </p>
                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Beschreibung:</strong> {meeting.description}
                    </p>
                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Raum:</strong> {meeting.place}
                    </p>
                </div>

                <div className="flex flex-row gap-4 mb-4 justify-end mt-auto items-center">
                    <div>
                        <CuteButton onClick={onClose} text={"Abbrechen"} bgColor={"#598BB1"} textColor={"#e6ebfc"}
                                    classname={"md:text-base text-sm"}/>
                    </div>
                    <div>
                        <CuteButton
                            onClick={updateMeeting}
                            text={"Meeting Bearbeiten"} bgColor={"#56A095"} textColor={"#e8fcf6"}
                            classname={"md:text-lg text-base"}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MeetingDetails;
