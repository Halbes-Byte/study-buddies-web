import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const weeks = Array.from({ length: 20 }, (_, i) => `W${i + 1}`);

const dataHorizontal = {
  labels: ['Rechnerkommunikation', 'Mathe I', 'Statistik', 'Datenbanken'],
  datasets: [{
    data: [3, 4, 10, 20],
    backgroundColor: '#5FA5A1',
    hoverBackgroundColor: '#DFB15A',
    borderColor: '#457A7A',
    borderWidth: 0,
    barThickness: 30
  }]
};

const dataVertical = {
  labels: ['alex_css_queen', 'jonas_677', 'luca_frings_bums', 'konsti229', 'ichbindave'],
  datasets: [{
    data: [15, 10, 6, 6, 6],
    backgroundColor: '#5FA5A1',
    hoverBackgroundColor: '#DFB15A',
    borderWidth: 0,
    barThickness: 90
  }]
};

const dataLine = {
  labels: weeks,
  datasets: [{
    data: weeks.reduce((acc) => {
      const next = Math.min(100, (acc.slice(-1)[0] || 0) + Math.random() * 10);
      return [...acc, Math.round(next)];
    }, [] as number[]),
    fill: false,
    borderColor: '#DFB15A',
    pointBackgroundColor: '#DFB15A',
    tension: 0.3,
    borderWidth: 2
  }]
};

const dataMultiLine = {
  labels: weeks,
  datasets: [
    {
      label: 'Rechnerkommunikation',
      data: [0, 0, 0, 0, 0, 0.23, 0.45, 0.9, 1.8, 3.6, 2.25, 2.7, 3.38, 7.55, 8.73, 5.1, 7.65, 4.5, 0],
      borderColor: '#2EF6D9',
      pointBackgroundColor: '#2EF6D9',
      tension: 0.3
    },
    {
      label: 'Mathe I',
      data: [0, 0.36, 0, 0, 0.6, 1.8, 3, 2.25, 2.7, 3.38, 2.25, 2.7, 3.2, 2.84, 4.4, 2.36, 7.8, 7.2, 2.4, 0],
      borderColor: '#FFFFFF',
      pointBackgroundColor: '#FFFFFF',
      tension: 0.3
    },
    {
      label: 'Statistik',
      data: [0, 0, 0, 0, 0, 0.1, 0.3, 0.8, 2.5, 6, 9, 9.5, 5, 8.5, 6.8, 9, 9.3, 9, 8.7, 2],
      borderColor: '#CF4C4E',
      pointBackgroundColor: '#CF4C4E',
      tension: 0.3
    },
    {
      label: 'Datenbanken',
      data: [0, 0.4, 1.13, 2.25, 2.7, 3.38, 2.25, 2.7, 3.38, 1.5, 3.38, 2.25, 2.7, 1.38, 1.5, 0.63, 0.63, 0.38, 2.25, 2.7].map(v => +v.toFixed(2)),
      borderColor: '#DFB15A',
      pointBackgroundColor: '#DFB15A',
      tension: 0.3
    }
  ]
};

const optionsHorizontal: ChartOptions<'bar'> = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false }, beginAtZero: true, ticks: { color: 'white' }, title: { display: true, text: 'Stunden gesamt', color: 'white' } },
    y: { grid: { color: 'rgba(255,255,255,0.2)' }, ticks: { color: 'white' }, title: { display: true, text: 'Modul', color: 'white' } }
  },
  plugins: { legend: { display: false } }
};

const optionsVertical: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false }, ticks: { color: 'white' } },
    y: { grid: { color: 'rgba(255,255,255,0.2)' }, beginAtZero: true, ticks: { color: 'white' }, title: { display: true, text: 'Lernstunden', color: 'white' } }
  },
  plugins: { legend: { display: false } }
};

const optionsLine: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false }, ticks: { color: 'white', callback: (v, i) => ({0:'März',5:'April',10:'Mai',15:'Juni',19:'Juli'}[i]||'') } },
    y: { min: 0, max: 100, ticks: { color: 'white', stepSize: 20, callback: v => `${v}%` }, grid: { color: 'rgba(255,255,255,0.2)' } }
  },
  plugins: { legend: { display: false } }
};

const optionsMultiLine: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false }, ticks: { color: 'white', callback: (v, i) => ({0:'März',5:'April',10:'Mai',15:'Juni',19:'Juli'}[i]||'') } },
    y: { min: 0, max: 10, ticks: { color: 'white', stepSize: 0.5 }, grid: { color: 'rgba(255,255,255,0.2)' }, title: { display: true, text: 'Stunden', color: 'white' } }
  },
  plugins: { legend: { display: true, position: 'bottom', labels: { color: 'white' } } }
};

export default function Score() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-screen w-screen">
      <div className="p-6 flex items-center justify-center">
        <div className="w-full h-full rounded-[20px] p-6 flex flex-col">
          <h2 className="text-xl text-white mb-4">Entwicklung deiner wöchentlichen Lerngruppenstunden:</h2>
          <div className="flex-1 min-h-[250px]"><Line data={dataMultiLine} options={optionsMultiLine} /></div>
        </div>
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-full h-full bg-[#2D3443] rounded-[20px] p-6 flex flex-col">
          <h2 className="text-xl text-white mb-4">So viel Zeit hast du pro Fach in Lerngruppen gelernt:</h2>
          <div className="flex-1 min-h-[250px]"><Bar data={dataHorizontal} options={optionsHorizontal} /></div>
        </div>
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-full h-full bg-[#2D3443] rounded-[20px] p-6 flex flex-col">
          <h2 className="text-xl text-white mb-4">Deine liebsten Study Buddies sind:</h2>
          <div className="flex-1 min-h-[250px]"><Bar data={dataVertical} options={optionsVertical} /></div>
        </div>
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-full h-full  rounded-[20px] p-6 flex flex-col">
          <h2 className="text-xl text-white mb-4">Deine Lernfortschrittsentwicklung:</h2>
          <div className="flex-1 min-h-[250px]"><Line data={dataLine} options={optionsLine} /></div>
          <div className="mt-4 flex items-center space-x-4 text-white">
            <button className="w-8 h-8 bg-[#247770] rounded">‹</button>
            <span className="font-medium">Rechnerkommunikation</span>
            <button className="w-8 h-8 bg-[#247770] rounded">›</button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 w-[2px] h-full bg-gray-700" />
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-700" />
     {/* <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[18rem] h-[18rem] rounded-full bg-[#5FA5A1] shadow-xl flex items-center justify-center z-10">
        <div className="w-[15rem] h-[15rem] rounded-full bg-[#247770] flex flex-col items-center justify-center text-white px-4">
          <div className="text-[7rem] font-extrabold leading-none">15</div>
          <div className="text-2xl font-medium mt-2 text-center">Lerngruppen insgesamt</div>
        </div> 
        </div>*/}
    </div>
  );
}
