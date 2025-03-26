import React from 'react';
import '../styles/Modal.css';
import {CuteButton} from "./CuteButton";
import {CreateMeetingDto} from "../dtos/MeetingDto";

interface ModalProps {
    isOpen: boolean;
    meeting: CreateMeetingDto | null;
    onClose: () => void;
    setIsMeetingFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({isOpen, meeting, onClose, setIsMeetingFormOpen}) => {
    if (!isOpen || !meeting) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content max-w-[90%] w-[450px]" onClick={(e) => e.stopPropagation()}>

                <h2 className="font-bold text-2xl text-white mb-4">{meeting.title}</h2>

                <div className="flex flex-col gap-4 mb-4">
                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Start:</strong> {meeting.date_from}
                    </p>
                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Ende:</strong> {meeting.date_until}
                    </p>
                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Beschreibung:</strong> {meeting.description}
                    </p>
                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Raum:</strong> {meeting.place}
                    </p>
                </div>

                <div className="flex flex-row gap-4 mb-4 justify-end mt-auto">
                    <div>
                        <CuteButton onClick={onClose} text={"Abbrechen"} textColor={"#CAE8FF"} bgColor={"#425E74"}
                                    classname={"text-base"}/>
                    </div>
                    <div>
                        <CuteButton
                            onClick={() => {
                                onClose();
                                setIsMeetingFormOpen(true)
                            }}
                            text={"Meeting Bearbeiten"} textColor={"#e3f1ef"}
                            bgColor={"#506D69"}
                            classname={"text-base"}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Modal;
