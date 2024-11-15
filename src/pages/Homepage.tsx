import '../index.css';
import title_img from '../data//titelbild.png';
import React from "react";

export default function Homepage() {
    return (
        <div className=" h-screen relative items-center justify-center justify-items-center grid">
            <div className="h-[70%] relative self-start grid justify-items-center">
                <div className="grid grid-cols-4 gap-1 justify-self-end">

                    <div className="flex flex-col gap-3 justify-self-end grid-cols-subgrid  col-span-2 self-center">
                        <h1 className="text-7xl font-bold text-gray-300">Study-Buddies</h1>
                        <p className="text-xl font-medium text-gray-300">Finde deinen Study-Buddy für deine
                            Study-Party</p>
                        <div className="px-0 py-0 flex flex-row justify-start gap-7 h-12">
                            <button
                                className="px-5 py-1 bg-[#598BB1] text-[#4BC2FE] rounded-full transform transition-all duration-300 hover:scale-x-110"> {/* Hintergrundfarbe mit Tailwind */}
                                Erstelle einen Termin
                            </button>
                            <button
                                className="px-5 py-1 bg-[#56A095] text-[#2EF6D9] rounded-full transform transition-all duration-300 hover:scale-x-110"> {/* Hintergrundfarbe mit Tailwind */}
                                Finde einen Lernpartner
                            </button>
                        </div>
                    </div>

                    <div className="w-[150%] self-center justify-self-start">

                        <img className="object-cover overflow-visible justify-self-start self-center" src={title_img} alt={"titelbild"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}