import React, { SVGProps } from "react"

export const Play: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 100 100"
            {...props}
        >
            <polygon points="0, 0 0, 100 75, 50" stroke="black" fill="white"/>
        </svg>
    )
}