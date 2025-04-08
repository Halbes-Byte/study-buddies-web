import {MeetingDto} from "../dtos/MeetingDto";
import {CuteButton} from "./CuteButton";
import React from "react";

export default function MeetingSearchResult(props: { meeting: MeetingDto }) {
    return (
        <div className="bg-[#333C4F] p-4 flex flex-col gap-4">
            <div>
                <div className="text-white">
                    {new Date(props.meeting.date_from).toLocaleString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    {" - "}
                    {new Date(props.meeting.date_until).toLocaleString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>
                <div className="text-white space-y-1">
                    <p>{props.meeting.description}</p>
                    <p>{props.meeting.member}</p>
                    <p>{props.meeting.place}</p>
                </div>
            </div>
            <div className="flex flex-col">
                <CuteButton onClick={() => {
                }} text={"Teilnehmen"} textColor={"#e8fcf6"}
                            bgColor={"#56A095"}
                            classname={"text-sm"}/>
            </div>
        </div>
    )
}
