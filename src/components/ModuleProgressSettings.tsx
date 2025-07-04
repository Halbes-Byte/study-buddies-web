import React, {useState} from 'react';
import '../styles/Modal.css';
import {CuteButton} from './CuteButton';
import {Chapter, UserModule} from "../dtos/ModuleDto";
import axiosInstance from "../AxiosConfig";
import {updateUserModules} from "../api/UserApi";
import Modal from "./Modal";

interface ModalProps {
    onClose: () => void;
    module: UserModule;
    allUserModules: UserModule[];
}

const ModuleProgressSettings: React.FC<ModalProps> = ({onClose, module, allUserModules}) => {
    const [chapters, setChapters] = useState<Chapter[]>(module.chapter);

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

    const saveProgress = async () => {
        try {
            module.chapter = chapters;
            const updatedModules = allUserModules.map(userModule =>
                userModule.name === module.name ? module : userModule
            );
            await updateUserModules(axiosInstance, updatedModules);
            onClose();
        } catch (error) {
            console.error("Error saving progress:" + error);
        }
    }

    return (
        <Modal onClose={onClose}>
            <p className="text-2xl font-bold text-white text-left sm:ml-3">
                Lernfortschritt
            </p>
            {chapters.map((chapter) => (
                <div key={chapter.id}>
                    <div className="flex gap-4 items-center mt-2 sm:ml-3 mb-2">
                        <p className="sm:text-xl text-lg text-white text-left">
                            {chapter.title}
                        </p>
                        <button
                            className="bg-transparent text-white border-none text-sm cursor-pointer p-0"
                            onClick={() => deleteChapter(chapter.id)}
                        >
                            x
                        </button>
                    </div>
                    <div className="flex flex-col items-start gap-2 sm:ml-8 mb-4">
                        {chapter.checkbox.map((checkbox) => (
                            <div key={checkbox.id}
                                 className="mb-2.5 p-2 bg-transparent rounded flex items-center justify-between gap-2.5 relative w-full">
                                <input
                                    type="checkbox"
                                    className="min-w-[30px] appearance-none w-[30px] h-[30px] bg-[#465370] rounded cursor-pointer inline-block relative
                                    checked:after:content-['✔'] checked:after:text-[#2EF6D9] checked:after:text-[50px] checked:after:absolute checked:after:top-1/2
                                    checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
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
                                    className="bg-transparent text-white border-none text-sm cursor-pointer p-0"
                                    onClick={() => deleteCheckbox(chapter.id, checkbox.id)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2.5 text-white sm:ml-8">
                        <button
                            className="bg-[#2EF6D9] text-white cursor-pointer p-2 w-[30px] h-[30px] rounded text-base inline-flex items-center justify-center"
                            onClick={() => addCheckbox(chapter.id)}
                        >
                            +
                        </button>
                        <label className="text-white">Checkbox </label>

                    </div>
                </div>
            ))}

            <div className="flex items-center gap-2.5 text-white sm:ml-8">
                <button
                    className="bg-[#2EF6D9] text-white cursor-pointer p-2 w-[30px] h-[30px] rounded text-base inline-flex items-center justify-center"
                    onClick={addChapter}>
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
        </Modal>
    );
};

export default ModuleProgressSettings;