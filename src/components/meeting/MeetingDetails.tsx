import React, { useEffect, useState } from 'react';
import '../../styles/Modal.css';
import { CuteButton } from "../CuteButton";
import { MeetingDto } from "../../dtos/MeetingDto";
import { getUserIdsForMeeting } from "../../api/UserGroupApi";
import axiosInstance from "../../AxiosConfig";
import {joinStudyGroup} from "../../api/UserGroupApi"

interface ModalProps {
    isOpen: boolean;
    meeting: MeetingDto | null;
    onClose: () => void;
    openMeetingForm: () => void;
    openChooseMeetingModal: () => void;
}

const MeetingDetails: React.FC<ModalProps> = ({ isOpen, meeting, onClose, openMeetingForm, openChooseMeetingModal }) => {

    const [userIds, setUserIds] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen && meeting) {
            getUserIdsForMeeting(axiosInstance, meeting.id)
                .then(setUserIds)
                .catch(err => {
                    console.error("Fehler beim Laden der Teilnehmer:", err);
                });
        }
    }, [isOpen, meeting]);

    if (!isOpen || !meeting) return null;

    const updateMeeting = () => {
        onClose();
        if (meeting.repeatable !== "NEVER")
            openChooseMeetingModal();
        else
            openMeetingForm();
    }

    const joinMeeting = () => {

        joinStudyGroup(axiosInstance, meeting.id)

    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content max-w-[90%] w-[700px] relative p-7" onClick={(e) => e.stopPropagation()}>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-xxl hover:text-red-400"
                >
                    ×
                </button>

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

                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Teilnehmer:</strong>
                    </p>
                    <ul className="text-white text-sm list-disc list-inside">
                        {userIds.map(id => (<li key={id}>{id}</li>))}
                        {userIds.length === 0 && <li>(noch keine Teilnehmer)</li>}
                    </ul>
                </div>

                <div className="flex flex-row gap-4 mb-4 justify-end mt-auto items-center">
                    <div>
                        <CuteButton
                            onClick={updateMeeting}
                            text={"Meeting bearbeiten"}
                            bgColor={"#598BB1"}
                            textColor={"#e6ebfc"}
                            classname={"md:text-base text-sm"}
                        />
                    </div>
                    <div>
                        <CuteButton
                            onClick={joinMeeting}
                            text={"Beitreten"}
                            bgColor={"#56A095"}
                            textColor={"#e8fcf6"}
                            classname={"md:text-lg text-base"}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MeetingDetails;
