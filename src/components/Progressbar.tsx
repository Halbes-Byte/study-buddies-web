import React from 'react';

const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <div className="w-full h-4 mt-4 bg-[#136357] rounded-xl">
            <div
                className="h-full rounded-xl"
                style={{ width: `${progress}%`, backgroundColor: '#81F1E1' }}
            ></div>
        </div>
    );
};

export default ProgressBar;
