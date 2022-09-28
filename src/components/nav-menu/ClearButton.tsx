import { useState } from "react";

interface ClearButtonProps {
    text: string;
    isAnimationInProgress: boolean;
    callSetOptionMethod: () => void;
}

export const ClearButton = ({ text, isAnimationInProgress, callSetOptionMethod }: ClearButtonProps) => {
    const [isHover, setIsHover] = useState(false);

    function getBgColor() {
        if (isHover)
            return "#22c4dd"
        if (isAnimationInProgress)
            return "#cccccc"
        return "white"
    }

    return (
        <div className="nav-bar-item" onClick={callSetOptionMethod}>
            <button
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={{ color: getBgColor() }}
                disabled={(isAnimationInProgress)}
                className="clear-btn"
                onClick={callSetOptionMethod}>
                <p>{text}</p>
            </button>
        </div>
    )
}