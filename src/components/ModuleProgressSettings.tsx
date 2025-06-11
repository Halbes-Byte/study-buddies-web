import React, {useState} from 'react';
import '../styles/Modal.css';
import {CuteButton} from './CuteButton';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Checkbox {
    id: number;
    text: string;
    checked: boolean;
}

interface Chapter {
    id: number;
    title: string;
    checkboxes: Checkbox[];
}

const ModuleProgressSettings: React.FC<ModalProps> = ({isOpen, onClose}) => {
    const [chapters, setChapters] = useState<Chapter[]>([
        {
            id: 1,
            title: 'Kapitel 1',
            checkboxes: [
                {id: 1, text: 'Checkbox 1', checked: false},
                {id: 2, text: 'Checkbox 2', checked: false},
                {id: 3, text: 'Checkbox 3', checked: false},
            ],
        },
    ]);

    const toggleCheckbox = (chapterId: number, checkboxId: number) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        checkboxes: chapter.checkboxes.map((checkbox) =>
                            checkbox.id === checkboxId
                                ? {...checkbox, checked: !checkbox.checked}
                                : checkbox
                        ),
                    }
                    : chapter
            )
        );
    };

    const addCheckbox = (chapterId: number) => {
        const newCheckbox = {
            id: Date.now(),
            text: `Checkbox ${Math.random()}`,
            checked: false,
        };

        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {...chapter, checkboxes: [...chapter.checkboxes, newCheckbox]}
                    : chapter
            )
        );
    };

    const deleteCheckbox = (chapterId: number, checkboxId: number) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        checkboxes: chapter.checkboxes.filter(
                            (checkbox) => checkbox.id !== checkboxId
                        ),
                    }
                    : chapter
            )
        );
    };

    const addChapter = () => {
        const newChapter = {
            id: Date.now(),
            title: `Kapitel ${chapters.length + 1}`,
            checkboxes: [],
        };
        setChapters((prev) => [...prev, newChapter]);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content p-8 min-w-[300px] w-[650px] overflow-y-scroll  max-h-[80%] max-w-[90%]"
                 onClick={(e) => e.stopPropagation()}>
                <p className="text-2xl font-bold text-white text-left sm:ml-3">
                    Lernfortschritt
                </p>
                {chapters.map((chapter) => (
                    <div key={chapter.id}>
                        <div className="flex gap-4 items-center mt-2 sm:ml-3 mb-4">
                            <p className="sm:text-xl text-lg text-white text-left">
                                {chapter.title}
                            </p>
                            <button
                                className="delete-btn"
                                onClick={() => {
                                }}
                            >
                                x
                            </button>
                        </div>
                        <div className="checkbox-group sm:ml-8 mb-4">
                            {chapter.checkboxes.map((checkbox) => (
                                <div key={checkbox.id} className="checkbox-item w-[65%]">
                                    <input
                                        type="checkbox"
                                        className={"min-w-[30px]"}
                                        checked={checkbox.checked}
                                        onChange={() => toggleCheckbox(chapter.id, checkbox.id)}
                                    />
                                    <input
                                        type="text"
                                        className={"flex-grow px-2"}
                                        value={checkbox.text}
                                        onChange={(e) => {
                                            const newText = e.target.value;
                                            setChapters((prevChapters) =>
                                                prevChapters.map((ch) =>
                                                    ch.id === chapter.id
                                                        ? {
                                                            ...ch,
                                                            checkboxes: ch.checkboxes.map((c) =>
                                                                c.id === checkbox.id
                                                                    ? {...c, text: newText}
                                                                    : c
                                                            ),
                                                        }
                                                        : ch
                                                )
                                            );
                                        }}
                                    />
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteCheckbox(chapter.id, checkbox.id)}
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="add-checkbox-container sm:ml-8">
                            <button
                                className="add-checkbox-btn"
                                onClick={() => addCheckbox(chapter.id)}
                            >
                                +
                            </button>
                            <label className="text-white">Checkbox </label>

                            <button className="add-chapter-btn" onClick={addChapter}>
                                +
                            </button>
                            <label className="text-white">Kapitel </label>
                        </div>
                    </div>
                ))}

                <div className="mt-auto flex justify-end items-center gap-4">
                    <CuteButton
                        onClick={onClose}
                        text={'Abbrechen'}
                        bgColor={"#598BB1"} textColor={"#ffffff"}
                        classname={'sm:text-base text-sm'}
                    />
                    <CuteButton
                        text={'Speichern'}
                        bgColor={"#56A095"} textColor={"#e8fcf6"}
                        classname={'sm:text-2xl text-lg'}
                    />
                </div>

            </div>
        </div>
    );
};

export default ModuleProgressSettings;