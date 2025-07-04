import React, {useEffect, useState} from 'react';
import '../../styles/Modal.css';
import {CuteButton} from '../CuteButton';
import {UserModule} from '../../dtos/ModuleDto';
import Modal from "../Modal";

interface Props {
    isOpen: boolean;
    modules: UserModule[];
    onClose: () => void;
    onSubmit: (moduleName: string, date: string, time: string, room: string) => void;
}

export default function ExamDateModal({isOpen, modules, onClose, onSubmit}: Props) {
    const [pick, setPick] = useState(modules[0] || '');
    const [day, setDay] = useState(pick.examDate);
    const [hour, setHour] = useState(pick.examTime);
    const [loc, setLoc] = useState(pick.examLoc);

    useEffect(() => {
        setDay(pick.examDate);
        setHour(pick.examTime);
        setLoc(pick.examLoc);
    }, [pick])

    if (!isOpen) return null;

    return (
        <Modal onClose={onClose}>
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl hover:text-red-400">×
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Prüfungstermin hinzufügen</h2>
            <div className="flex flex-col gap-4 mb-4">
                <select value={pick.name}
                        onChange={e => {
                            const selectedModule = modules.find(m => m.name === e.target.value);
                            if (selectedModule)
                                setPick(selectedModule);
                        }}
                        className="p-2 rounded bg-[#475370] text-white">
                    {modules.map(m => <option key={m.name}>{m.name}</option>)}
                </select>
                <input type="date" value={day} onChange={e => setDay(e.target.value)}
                       className="p-2 rounded bg-[#475370] text-white"/>
                <input type="time" value={hour} onChange={e => setHour(e.target.value)}
                       className="p-2 rounded bg-[#475370] text-white"/>
                <input type="text" placeholder="Raum" value={loc} onChange={e => setLoc(e.target.value)}
                       className="p-2 rounded bg-[#475370] text-white"/>
            </div>
            <div className="flex items-center w-full gap-2">
                <CuteButton onClick={onClose} text="Abbrechen" bgColor="#598BB1" textColor="#e6ebfc"
                            classname="xl:text-base text-sm ml-auto"/>
                <CuteButton onClick={() => onSubmit(pick.name, day, hour, loc)} text="Speichern" bgColor="#56A095"
                            textColor="#e8fcf6" classname="xl:text-xl text-base"/>
            </div>
        </Modal>
    );
}