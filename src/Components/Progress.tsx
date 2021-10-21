import React, { MouseEventHandler } from 'react';

import '../styles/progress.css';

export type ProgressProps = {
    currentTime: number;
    buffered: number;
    duration: number;
    setCurrentTime: (time: number) => void;
};

export const Progress: React.FC<ProgressProps> = ({
    currentTime,
    buffered,
    duration,
    setCurrentTime
}) => {

    
    const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
        const x = e.clientX - 20;
        const width = e.currentTarget.clientWidth;
        setCurrentTime(x / width * duration)
    }

    return (
        <div className="progress-bar-container" onClick={onClick}>
            <div className="progress background" />
            <div className="progress buffer" style={{ width: `${buffered/duration * 100}%` }}/>
            <div className="progress state" style={{ width: `${currentTime/duration * 100}%` }}/>
        </div>
    )
}