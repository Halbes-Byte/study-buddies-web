import React, {useEffect, useState} from "react";
import {CuteButton} from "../CuteButton";
import axiosInstance from "../../AxiosConfig";
import {getUser, updateUserModules, updateUsername} from "../../api/UserApi";
import {UserDto} from "../../dtos/UserDto";
import {ModuleDto} from "../../dtos/ModuleDto";
import {createModule, getModules} from "../../api/ModuleApi";


export default function UserSettings() {
    const [user, setUser] = useState<UserDto | undefined>();
    const [editProfile, setEditProfile] = useState(false);
    const [editModule, setEditModule] = useState(false);
    const [profileName, setProfileName] = useState(user?.username);
    const [ownModules, setOwnModules] = useState<ModuleDto[]>([]);
    const [allModules, setAllModules] = useState<ModuleDto[]>([]);
    const [module, setModule] = useState<string>("");

    const fetchAllModules = async () => {
        try {
            const response = await getModules(axiosInstance);
            setAllModules(response);
            console.log(response);
        } catch (error) {
            alert("Error fetching user modules:" + error);
        }
    }

    const fetchUserInfo = async () => {
        try {
            const response = await getUser(axiosInstance);
            setUser(response);
            setOwnModules(response.modules);
        } catch (error) {
            alert("Fehler beim Abrufen der UserDaten: " + error);
        }
    }

    useEffect(() => {
        fetchAllModules();
        fetchUserInfo();
    }, []);

    const editProfileMode = (mode: boolean) => {
        setProfileName(user?.username);
        setEditProfile(mode);
    }

    const saveProfileModifications = () => {
        if (!profileName) {
            return;
        }
        updateUsername(axiosInstance, profileName);
        editProfileMode(false);
        fetchUserInfo();
    }

    const saveNewModule = async () => {
        try {
            await createModule(axiosInstance, module);
            fetchAllModules();
        } catch (error) {
            alert("Error fetching user modules:" + error);
        }
    }

    const saveModules = async () => {
        try {
            await updateUserModules(axiosInstance, ownModules);
            fetchUserInfo();
            setEditModule(false);
        } catch (error) {
            alert("Error fetching user modules:" + error);
        }
    }

    const addModule = () => {
        if (!ownModules.some(m => m.name.toUpperCase() === module.toUpperCase()))
            setOwnModules([...ownModules, {name: module}]);
        setModule("");
        if (!allModules.some(m => m.name.toUpperCase() === module.toUpperCase())) {
            saveNewModule();
        }
    }

    const deleteModule = (moduleName: string) => {
        setOwnModules(ownModules.filter(m => m.name !== moduleName));
    }

    const editModulesMode = (mode: boolean) => {
        setOwnModules(user ? user.modules : []);
        setEditModule(mode);
    }

    return (
        <div className="lg:w-[40%] w-[80%] bg-[#1C212C] text-white sm:p-4 mb-12 lg:ml-16 ml-4 ">
            <div className="w-full">
                <h1 className="md:text-5xl text-4xl font-bold text-gray-300 text-left mt-16">Mein
                    Studium</h1>
                <p className="text-xl font-medium text-white text-left mt-3">Mein Profil</p>
                <div className="p-4 lg:mr-20 mr-8 mt-2">
                    {editProfile ? (
                        <input
                            id="profileName"
                            type="text"
                            placeholder={"Name"}
                            className="text-gray-300 block bg-[#333C4F] w-full px-10 py-2 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-550 placeholder:text-xs"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                        />
                    ) : (
                        <p className="py-2 border-b border-[#4B708C] text-gray-300">Name: {user?.username}</p>
                    )}
                </div>
                <div className="mt-3 mb-8">
                    {editProfile ? (
                        <div className={"flex items-center w-full gap-2 lg:pr-20 pr-8"}>
                            <CuteButton classname="lg:text-base text-sm ml-auto" bgColor={"#598BB1"}
                                        textColor={"#e6ebfc"} onClick={() => editProfileMode(false)}
                                        text="Abbrechen"/>
                            <CuteButton classname="lg:text-lg text-base" bgColor={"#56A095"} textColor={"#e8fcf6"}
                                        onClick={saveProfileModifications}
                                        text="Speichern"/>
                        </div>
                    ) : (
                        <CuteButton bgColor="#598BB1" classname="lg:text-lg text-base" textColor="#e6ebfc"
                                    text="Profil verwalten" onClick={() => editProfileMode(true)}/>
                    )}

                </div>
                <p className="text-xl font-medium text-white text-left mt-3">Aktuelle Module</p>
                <div className="p-4 lg:mr-20 mr-8 mt-2">
                    <table className="w-full border-collapse">
                        <tbody>
                        {editModule ? (
                            <div className={"flex flex-col gap-4"}>
                                {ownModules.map((subject) => (
                                    <div
                                        className={"flex flex-row justify-between pr-4 py-1 border-b border-[#4B708C] text-gray-300"}>
                                        <p>{subject.name}</p>
                                        <button
                                            onClick={() => deleteModule(subject.name)}
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                                <input
                                    id="module"
                                    type="text"
                                    placeholder={"Modul"}
                                    className="text-gray-300 block bg-[#333C4F] w-full px-10 py-2 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-550 placeholder:text-xs"
                                    value={module}
                                    onChange={(e) => setModule(e.target.value)}
                                />

                                <datalist id="modules">
                                    {allModules.map((module, index) => (
                                        <option key={index} className={"w-full"} value={module.name}/>
                                    ))}
                                </datalist>
                                <div className="flex flex-col w-full my-4">
                                    <button
                                        className="bg-[#2EF6D9] text-white cursor-pointer p-[10px] border-none w-[30px] h-[30px] rounded font-semibold text-[16px] inline-flex items-center"
                                        onClick={() => addModule()}>
                                        +
                                    </button>
                                </div>

                            </div>
                        ) : (
                            ownModules.map((subject, index) => (
                                <tr key={index}>
                                    <td className="py-2 border-b border-[#4B708C] text-gray-300">{subject.name}</td>
                                </tr>
                            ))

                        )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-3">
                    {editModule ? (
                        <div className={"flex items-center w-full gap-2 lg:pr-20 pr-8"}>
                            <CuteButton classname="lg:text-base text-sm ml-auto" bgColor={"#598BB1"}
                                        textColor={"#e6ebfc"} onClick={() => editModulesMode(false)}
                                        text="Abbrechen"/>
                            <CuteButton classname="lg:text-lg text-base" bgColor={"#56A095"} textColor={"#e8fcf6"}
                                        onClick={saveModules}
                                        text="Speichern"/>
                        </div>
                    ) : (
                        <CuteButton bgColor="#598BB1" classname="lg:text-lg text-base" textColor="#e6ebfc"
                                    text="Module verwalten" onClick={() => editModulesMode(true)}/>
                    )}
                </div>
            </div>
        </div>
    );
}
