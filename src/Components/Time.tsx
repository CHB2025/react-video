import React, { useEffect, useState } from 'react';

export type TimeProps = {
    time: number // time in seconds
}

export const Time: React.FC<TimeProps> = ({time}) => {
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    useEffect(() => {
        let thisTime = Math.abs(Math.round(time));
        setHours(Math.floor(thisTime / 3600))
        thisTime %= 3600;
        setMinutes(Math.floor(thisTime / 60))
        thisTime %= 60;
        setSeconds(Math.round(thisTime));
    }, [time])

    return (
        <span>{hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}{minutes.toString()}:{seconds.toString().padStart(2, '0')}</span>
    )
}