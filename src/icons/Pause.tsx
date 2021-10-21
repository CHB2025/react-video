import React, { SVGProps } from 'react';

export const Pause: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 100 100"
            {...props}
        >
            <rect width="30" height="100" fill="white"/>
            <rect x="50" width="30" height="100" fill="white"/>
        </svg>
    )
}