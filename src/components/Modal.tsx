import React from 'react';
import '../styles/Modal.css';
import {CuteButton} from "../components/CuteButton";


interface ModalProps {
    isOpen: boolean;
    title: string;
    start: string;
    end: string;
    description: string;
    room: string;
    onClose: () => void;  
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, start, end, description, room, onClose }) => {
    if (!isOpen) return null; 

    return (
        <div className="modal-overlay" onClick={onClose}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>

    <h2 className="font-bold text-2xl text-white mb-4">{title}</h2>
    
    <div className="flex flex-wrap gap-4 mb-4">
      <p className="text-bs font-medium text-white">
        <strong className="text-[#CAE8FF] font-semibold">Start:</strong> {start}
      </p>
      <p className="text-bs font-medium text-white">
        <strong className="text-[#CAE8FF] font-semibold">Ende:</strong> {end}
      </p>
      <p className="text-bs font-medium text-white">
        <strong className="text-[#CAE8FF] font-semibold">Beschreibung:</strong> {description}
      </p>
      <p className="text-bs font-medium text-white">
        <strong className="text-[#CAE8FF] font-semibold">Raum:</strong> {room}
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
