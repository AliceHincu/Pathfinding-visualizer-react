import { useState } from "react";
import { selectIsAnimationInProgress } from "../../redux-features/boardSlice";
import { useAppSelector } from "../../redux-features/hooks";

interface ClearButtonProps {
    text: string;
    callSetOptionMethod: () => void;
}

export const ClearButton = ({ text, callSetOptionMethod }: ClearButtonProps) => {
    const [isHover, setIsHover] = useState(false);
    const isAnimationInProgress = useAppSelector(selectIsAnimationInProgress);

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