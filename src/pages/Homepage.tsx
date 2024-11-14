import '../index.css';
import logo from '../data//halbesByte.jpeg';
import pinguin from '../data//penguin-48226_1280.svg';
import menu from '../data//menu-button.svg';
import React from "react";
import {Link} from "react-router-dom";



export function Navbar() {
    return (
      <nav className=" bg-[#111111] text-white p-4">
        <div className="flex justify-between items-center">
          {/* Logo als Link */}
          <Link to="">
            <img className="absolute top-20 left-60 z-50 h-8" src={menu} alt="Back to homepage" />
          </Link>
  
          {/* Menü Links */}
          <div className="flex space-x-4">
            <Link to="" className="text-white hover:text-gray-300">Kalender</Link>
            {/* Füge hier weitere Links hinzu */}
          </div>
        </div>
      </nav>
    );
  }
  

export default function Homepage() {
    return (
        
        <div className="relative">
            <Navbar />

            <div className="flex justify-center items-center h-screen ">

                <div className="grid row grid-rows-3 gap-0">

                <div className="flex flex-row justify-between gap-10">
                    <h1 className="text-7xl font-bold text-gray-300">Study-Buddies</h1>
                    <img className="h-20 transform scale-x-[-1]" src={pinguin} alt={"ein Pinguin"}/>
                </div>
                <p className="text-xl font-medium text-gray-300">Finde deinen Study-Buddy für deine Study-Party</p>
                

                <div className="px-0 py-0 flex flex-row justify-start gap-7 h-12"> {/* Kleinere Höhe für die div */}
                 <button className="px-5 py-1 bg-[#598BB1] text-[#4BC2FE] rounded-full"> {/* Hintergrundfarbe mit Tailwind */}
    Erstelle einen Termin
                 </button>
                <button className="px-5 py-1 bg-[#56A095] text-[#2EF6D9] rounded-full"> {/* Hintergrundfarbe mit Tailwind */}
    Finde einen Lernpartner
             </button>
</div>


                </div>
              
              

            </div>
        </div>
    );
}