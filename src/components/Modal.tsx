import React from 'react';
import '../styles/Modal.css';
import { CuteButton } from "../components/CuteButton";
import { MeetingDto } from "../dtos/MeetingDto"; 

interface ModalProps {
    isOpen: boolean;
    meeting: MeetingDto | null; 
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, meeting, onClose }) => {
    if (!isOpen || !meeting) return null; 
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <h2 className="font-bold text-2xl text-white mb-4">{meeting.title}</h2>

                <div className="flex flex-wrap gap-4 mb-4">
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

                <div className="mt-auto flex justify-end">
                    <CuteButton onClick={onClose} text={"Schließen"} textColor={"#CAE8FF"} bgColor={"#425E74"} size={"text-base"} />
                </div>

            </div>
        </div>
    );
};

export default Modal;
