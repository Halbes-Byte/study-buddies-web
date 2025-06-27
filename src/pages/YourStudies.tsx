import React, {useState} from "react";
import UserSettings from "../components/yourStudies/UserSettings";
import UserInfo from "../components/yourStudies/UserInfo";
import '../styles/Scrollbar.css';

export default function YourStudies() {
    const [reload, setReload] = useState<boolean>(false);
    return (
        <div
            className="flex lg:justify-between justify-start lg:flex-row scrollbar flex-col overflow-y-scroll lg:items-start items-center lg:mt-12 mt-4 h-full">
            <UserSettings reload={reload} setReload={setReload}/>
            <div className="lg:h-[90%] lg:w-[1px] w-[90%] min-h-[2px] bg-[#1C7E70]"></div>
            <UserInfo reload={reload}/>
        </div>
    );
}
