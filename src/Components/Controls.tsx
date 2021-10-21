import React from 'react';
import { Time } from './Time';
import { Play } from '../icons/Play';
import { Pause } from '../icons/Pause';
import { Loading } from '../icons/Loading';
import { Progress } from './Progress';

import '../styles/control-bar.css';

export type ControlProps = {
    isPlaying: boolean;
    currentTime: number;
    buffer: number;
    duration: number;
    canPlay: boolean;
    hideControls?: boolean;
    setCurrentTime: (time: number) => void;
    toggleIsPlaying: () => void;
}

export const Controls: React.FC<ControlProps> = ({
    isPlaying, 
    currentTime,
    buffer,
    duration, 
    canPlay,
    hideControls,
    toggleIsPlaying,
    setCurrentTime
}) => {

    return (
        <div 
            className={`video-player-controls ${hideControls ? 'fade' : ''}`}
        >
            <Progress
                currentTime={currentTime}
                buffered={buffer}
                duration={duration}
                setCurrentTime={setCurrentTime}
            />
            <div className="control-wrapper">
                <button 
                    className='play-button'
                    onClick={toggleIsPlaying}
                    disabled={!canPlay}
                >
                    { canPlay ? isPlaying ? <Pause/> : <Play/> : <Loading/> }
                </button>
                <span>
                    <Time time={currentTime}/>/<Time time={duration}/>
                </span>
            </div>
        </div>
    )
}