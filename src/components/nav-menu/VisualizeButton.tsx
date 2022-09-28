import { useState } from "react";
import { NAV_MENU_HEIGHT } from "../../constants/dimensions";
import { selectIsAnimationInProgress } from "../../redux-features/boardSlice";
import { useAppSelector } from "../../redux-features/hooks";

interface VisualizeButtonProps {
    selectedAlgorithm: string;
    isVisualizationFinished: boolean;
    callSetOptionMethod: () => void;
}

export const VisualizeButton = ({ selectedAlgorithm, isVisualizationFinished, callSetOptionMethod }: VisualizeButtonProps) => {
    const [isHover, setIsHover] = useState(false);
    const isAnimationInProgress = useAppSelector(selectIsAnimationInProgress);

    function getBgColor() {
        if (isHover) {
            if (isAnimationInProgress || !isVisualizationFinished)
                return "#cccccc"
            else
                return "#76dfef"
        }
        if (isAnimationInProgress)
            return "#cccccc"
        return "#22c4dd"
    }

    return (
        <div className="nav-bar-item" style={{ height: NAV_MENU_HEIGHT * 4 / 5 }}>
            <button
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={{ backgroundColor: getBgColor() }}
                disabled={(isAnimationInProgress || !isVisualizationFinished)}
                className="visualize-btn"
                onClick={callSetOptionMethod}>
                Visualize {selectedAlgorithm}!
            </button>
        </div>
    )
}