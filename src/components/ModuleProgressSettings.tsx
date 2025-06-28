import React, {useState, useEffect} from 'react';
import '../styles/Modal.css';
import {CuteButton} from './CuteButton';
import {Chapter, UserModule} from "../dtos/ModuleDto";
import axiosInstance from "../AxiosConfig";
import {updateUserModules} from "../api/UserApi";

interface ModalProps {
    onClose: () => void;
    module: UserModule;
    allUserModules: UserModule[];
}

const ModuleProgressSettings: React.FC<ModalProps> = ({onClose, module, allUserModules}) => {
    const [chapters, setChapters] = useState<Chapter[]>(module.chapter);
    const [progress, setProgress] = useState<number>(0);

    // Berechne den Fortschritt (in %) bei jedem Ändern der Checkboxen
    useEffect(() => {
        const allBoxes = chapters.flatMap(ch => ch.checkbox);
        const total = allBoxes.length;
        const checkedCount = allBoxes.filter(box => box.checked).length;
        const percent = total > 0 ? Math.round((checkedCount / total) * 100) : 0;
        setProgress(percent);
    }, [chapters]);

    const clickCheckbox = (chapterId: number, checkboxId: string) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        checkbox: chapter.checkbox.map((checkbox) =>
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
            id: Date.now().toString(),
            title: `Add Title`,
            checked: false,
        };

        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {...chapter, checkbox: [...chapter.checkbox, newCheckbox]}
                    : chapter
            )
        );
    };

    const deleteCheckbox = (chapterId: number, checkboxId: string) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        checkbox: chapter.checkbox.filter(
                            (checkbox) => checkbox.id !== checkboxId
                        ),
                    }
                    : chapter
            )
        );
    };

    const deleteChapter = (chapterId: number) => {
        setChapters((prevChapters) =>
            prevChapters.filter(
                (chapter) => chapter.id !== chapterId
            ),
        );
    };

    const addChapter = () => {
        const newChapter = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            title: `Kapitel ${chapters.length + 1}`,
            checkbox: [],
        };
        setChapters((prev) => [...prev, newChapter]);
    };

    const saveProgress = () => {
        try {
            module.chapter = chapters;
            const updatedModules = allUserModules.map(userModule =>
                userModule.name === module.name ? module : userModule
            );
            updateUserModules(axiosInstance, updatedModules);
            onClose();
        } catch (error) {
            console.error("Error saving progress:" + error);
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content p-8 min-w-[300px] w-[650px] overflow-y-scroll  max-h-[80%] max-w-[90%]"
                 onClick={(e) => e.stopPropagation()}>
                <p className="text-2xl font-bold text-white text-left sm:ml-3">
                    Lernfortschritt
                </p>

                {/* Progress-Bar */}
                <div className="progress-container sm:ml-3 mb-6">
                    <div className="progress-bar" style={{width: `${progress}%`}}/>
                    <span className="text-white text-sm ml-2">{progress}%</span>
                </div>

                {chapters.map((chapter) => (
                    <div key={chapter.id}>
                        <div className="flex gap-4 items-center mt-2 sm:ml-3 mb-4">
                            <p className="sm:text-xl text-lg text-white text-left">
                                {chapter.title}
                            </p>
                            <button
                                className="delete-btn"
                                onClick={() => deleteChapter(chapter.id)}
                            >
                                x
                            </button>
                        </div>
                        <div className="checkbox-group sm:ml-8 mb-4">
                            {chapter.checkbox.map((checkbox) => (
                                <div key={checkbox.id} className="checkbox-item w-[65%]">
                                    <input
                                        type="checkbox"
                                        className={"min-w-[30px]"}
                                        checked={checkbox.checked}
                                        onChange={() => clickCheckbox(chapter.id, checkbox.id)}
                                    />
                                    <input
                                        type="text"
                                        className={"flex-grow px-2"}
                                        value={checkbox.title}
                                        onChange={(e) => {
                                            const newText = e.target.value;
                                            setChapters((prevChapters) =>
                                                prevChapters.map((ch) =>
                                                    ch.id === chapter.id
                                                        ? {
                                                            ...ch,
                                                            checkbox: ch.checkbox.map((c) =>
                                                                c.id === checkbox.id
                                                                    ? {...c, title: newText}
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

                        </div>
                    </div>
                ))}

                <div className="add-checkbox-container sm:ml-8">
                    <button className="add-chapter-btn" onClick={addChapter}>
                        +
                    </button>
                    <label className="text-white">Kapitel </label>
                </div>

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
                        onClick={saveProgress}
                    />
                </div>

            </div>
        </div>
    );
};

export default ModuleProgressSettings;