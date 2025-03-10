import React, { useState } from 'react';
import '../styles/Modal.css';
import { CuteButton } from "./CuteButton";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [checkbox1, setCheckbox1] = useState<boolean>(false);
    const [checkbox2, setCheckbox2] = useState<boolean>(false);
    const [checkbox3, setCheckbox3] = useState<boolean>(false);

    const toggleCheckbox1 = () => setCheckbox1(!checkbox1);
    const toggleCheckbox2 = () => setCheckbox2(!checkbox2);
    const toggleCheckbox3 = () => setCheckbox3(!checkbox3);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                <p className="text-2xl font-bold text-white text-left mt-3 ml-3 mb-6">Lernfortschritt</p>

                <p className="text-m text-white text-left mt-2 ml-3 mb-2">Kapitel 1</p>

                <div className="ml-3 mb-4">
                    <label className="text-white flex items-center">
                        <input 
                            type="checkbox" 
                            checked={checkbox1} 
                            onChange={toggleCheckbox1} 
                        />
                        Checkbox 1
                    </label>
                    <label className="text-white flex items-center">
                        <input 
                            type="checkbox" 
                            checked={checkbox2} 
                            onChange={toggleCheckbox2} 
                        />
                        Checkbox 2
                    </label>
                    <label className="text-white flex items-center">
                        <input 
                            type="checkbox" 
                            checked={checkbox3} 
                            onChange={toggleCheckbox3} 
                        />
                        Checkbox 3
                    </label>
                </div>

                <div className="mt-auto flex justify-end">
                    <CuteButton onClick={onClose} text={"Abbrechen"} textColor={"#CAE8FF"} bgColor={"#425E74"}
                        classname={"text-base"}/>
                    <CuteButton text={"Speichern"} textColor={"#e3f1ef"} bgColor={"#506D69"}
                        classname={"text-2xl"}/>
                </div>
                
            </div>
        </div>
    );
};

export default Modal;
