import { useState } from "react";
import { NAV_MENU_HEIGHT } from "../../constants/dimensions";

interface VisualizeButtonProps {
    selectedAlgorithm: string;
    isAnimationInProgress: boolean;
    isVisualizationFinished: boolean;
    callSetOptionMethod: () => void;
}

export const VisualizeButton = ({ selectedAlgorithm, isAnimationInProgress, isVisualizationFinished, callSetOptionMethod }: VisualizeButtonProps) => {
    const [isHover, setIsHover] = useState(false);

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