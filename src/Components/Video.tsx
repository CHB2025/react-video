import React, { useEffect, useRef, useState } from 'react';
import { Controls } from './Controls';

import '../styles/video-player.css';

export type VideoProps = {
    src: string;
    fixedControls?: boolean;
    controlHideDelay?: number;
    height?: string;
    width?:string;
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'ref'>

export const Video: React.FC<VideoProps> = ({
    src,
    height,
    width,
    fixedControls = false,
    controlHideDelay = 1,
    onWaiting,
    onClick,
    onCanPlay,
    onEnded,
    onTimeUpdate, 
    ...rest
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [bufferedEnd, setBufferedEnd] = useState<number>(0);
    const [isBuffering, setIsBuffering] = useState<boolean>(true);
    const [canPlay, setCanPlay] = useState<boolean>(false);
    const [hideControls, setHideControls] = useState<boolean>(true);
    const [hideControlsTimeout, setHideControlsTimeout] = useState<NodeJS.Timeout>();
    const [lastMoved, setLastMoved] = useState<number>(Date.now());

    useEffect(() => {
        setHideControls(false);
        if(hideControlsTimeout) clearTimeout(hideControlsTimeout)
        if(!fixedControls && isPlaying){
            setHideControlsTimeout(
                setTimeout( () => {
                    setHideControls(true)
                }, controlHideDelay * 1000)
            )
        }
        // eslint suggests adding hideControlsTimeout, which would cause an infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlHideDelay, isPlaying, lastMoved, fixedControls])

    // Event listener for time events
    const handleTimeUpdate = () => {
        if(!videoRef.current) return;

        setCurrentTime(videoRef.current.currentTime || 0);

        try{
            const bufferLength = videoRef.current.buffered.length;
            let newBufferedEnd = 0;

            for(let i = 0; i < bufferLength; i++) {
                if(videoRef.current.buffered.start(bufferLength - 1 - i) < currentTime) {
                    newBufferedEnd = videoRef.current.buffered.end(bufferLength - 1 - i);
                    break;
                }
            }
            setBufferedEnd(newBufferedEnd)
        } catch (error){}
    }

    const togglePlaying = () => {
        if(!videoRef.current || !canPlay || isBuffering) return;

        if(isPlaying){
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const setVideoTime = (time: number) => {
        if(!videoRef.current) return;

        videoRef.current.currentTime = time;
    }

    return (
        <div 
            className="video-player"
            style={{
                height,
                width
            }}
            onMouseMove={() => setLastMoved(Date.now())}
        >
            <video
                {...rest}
                ref={videoRef}
                src={src}
                onClick={(e) => {
                    togglePlaying()
                    if(onClick) onClick(e)
                }}
                onCanPlay={(e) => {
                    console.log('canPlay')
                    setIsBuffering(false);
                    setCanPlay(true);
                    if(onCanPlay) onCanPlay(e)
                }}
                onWaiting={(e) => {
                    console.log('waiting')
                    setIsBuffering(true);
                    setCanPlay(false);
                    if(onWaiting) onWaiting(e)
                }}
                onEnded={(e) => {
                    console.log('ended');
                    setIsPlaying(false);
                    if(onEnded) onEnded(e);
                }}
                onTimeUpdate={(e) => {
                    handleTimeUpdate()
                    if(onTimeUpdate) onTimeUpdate(e)
                }}
            />
            <Controls 
                isPlaying={isPlaying}
                toggleIsPlaying={togglePlaying}
                setCurrentTime={setVideoTime}
                currentTime={currentTime}
                buffer={bufferedEnd}
                duration={videoRef.current?.duration || 0}
                canPlay={canPlay}
                hideControls={hideControls}
            />
        </div>
    )
}
