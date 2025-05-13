import React, {useEffect, useState} from 'react';
import {MeetingDto} from "../../dtos/MeetingDto";
import {UserDto} from "../../dtos/UserDto";
import {getUser} from "../../api/UserApi";
import {getUserIdsForMeeting, joinStudyGroup, leaveStudyGroup} from "../../api/UserGroupApi";
import axiosInstance from "../../AxiosConfig";
import {CuteButton} from "../CuteButton";
import {deleteMeeting, updateCreator} from '../../api/MeetingApi';
import {Theme, Tooltip} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
    meeting: MeetingDto;
}

export default function MeetingSearchResult({meeting}: Props) {
    const [userIds, setUserIds] = useState<string[]>([]);
    const [myUser, setMyUser] = useState<UserDto | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const mdAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

    useEffect(() => {
        getUser(axiosInstance)
            .then(setMyUser)
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        getUserIdsForMeeting(axiosInstance, meeting.id)
            .then(setUserIds)
            .catch(err => console.error(err));
    }, [meeting.id]);

    if (!myUser) return null;

    const myUserId = myUser.uuid;

    const joinMeeting = () => {
        setLoading(true);
        joinStudyGroup(axiosInstance, meeting.id)
            .then(() => setUserIds(prev => [...prev, myUserId]))
            .finally(() => setLoading(false));
    };

    const leaveMeeting = () => {
        setLoading(true);
        leaveStudyGroup(axiosInstance, meeting.id)
            .then(() => setUserIds(prev => prev.filter(id => id !== myUserId)))
            .finally(() => setLoading(false));
    };

    const leaveMeetingAsCreator = () => {
        if (userIds.length === 0) {
            deleteMeeting(axiosInstance, meeting.id)
                .then(() => console.log("Meeting gelöscht"))
                .catch(err => console.error(err));
        } else {
            const newCreatorId = userIds[0];
            updateCreator(axiosInstance, meeting.id, newCreatorId)
                .then(() => console.log("Creator geändert"))
                .catch(err => console.error(err));
        }
    };

    const isMember = userIds.includes(myUserId);
    const isCreator = meeting.creator === myUserId;

    return (
        <div className="bg-[#333C4F] p-4 flex flex-col gap-4">
            <div className="min-h-80">
                <h2 className="font-bold text-2xl text-white mb-4 line-clamp-1">{meeting.title}</h2>

                <div className="flex flex-col gap-4 mb-4">
                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Start: </strong>
                        {new Date(meeting.dateFrom).toLocaleString('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                    <p className="text-bs font-medium text-white">
                        <strong className="text-[#CAE8FF] font-semibold">Ende: </strong>
                        {new Date(meeting.dateUntil).toLocaleString('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                    <p className="text-bs font-medium text-white break-words whitespace-normal md:line-clamp-2">
                        <strong className="text-[#CAE8FF] font-semibold ">Beschreibung:</strong> {meeting.description}
                    </p>
                    <p className="text-bs font-medium text-white break-words whitespace-normal md:line-clamp-2">
                        <strong className="text-[#CAE8FF] font-semibold">Raum:</strong> {meeting.place}
                    </p>
                    {mdAndUp ? (
                        <>
                            <p className="text-bs font-medium text-white">
                                <strong className="text-[#CAE8FF] font-semibold">Creator:</strong>
                            </p>
                            <Tooltip
                                title={<>
                                    <p>Alle Teilnehmenden:</p>
                                    <ul style={{margin: 0, padding: 0, listStyle: 'inside'}}>
                                        <li key={meeting.creator}>{meeting.creator}</li>
                                        {userIds.map(id => (
                                            <li key={id}>{id}</li>
                                        ))}

                                    </ul>
                                </>}
                            >
                                <ul className="text-white text-sm list-disc list-inside line-clamp-1">
                                    <li key={meeting.creator}>{meeting.creator}</li>
                                </ul>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <p className="text-bs font-medium text-white">
                                <strong className="text-[#CAE8FF] font-semibold">Teilnehmende:</strong>
                            </p>
                            <ul className="text-white text-sm list-disc list-inside">
                                <li key={meeting.creator}>{meeting.creator}</li>
                                {userIds.map(id => (
                                    <li key={id}>{id}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>

            <div className="flex gap-4">
                {!isMember && !isCreator && !loading && (
                    <CuteButton
                        onClick={joinMeeting}
                        text={"Teilnehmen"}
                        textColor={"#e8fcf6"}
                        bgColor={"#56A095"}
                        classname={"text-sm w-full"}
                    />
                )}
                {loading && (
                    <CuteButton
                        text={"Lade..."}
                        textColor={"#e8fcf6"}
                        bgColor={"#56A095"}
                        classname={"text-sm w-full"}
                    />
                )}

                {isCreator && !loading && (
                    <CuteButton
                        onClick={leaveMeetingAsCreator}
                        text={"Meeting verlassen"}
                        textColor={"#e8fcf6"}
                        bgColor={"#974242"}
                        classname={"text-sm w-full"}
                    />
                )}

                {isMember && !isCreator && !loading && (
                    <CuteButton
                        onClick={leaveMeeting}
                        text={"Meeting verlassen"}
                        textColor={"#e8fcf6"}
                        bgColor={"#974242"}
                        classname={"text-sm w-full"}
                    />
                )}
            </div>
        </div>
    )
        ;
}
