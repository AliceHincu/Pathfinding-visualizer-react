import { useState } from "react";
import { NAV_MENU_HEIGHT } from "../../constants/dimensions";
import { selectIsAnimationInProgress } from "../../redux-features/boardSlice";
import { useAppSelector } from "../../redux-features/hooks";
import './Nav-menu.css'

interface DrodownProps {
  title: string;
  isVisualizationFinished: boolean;
  options: string[];
  callSetOptionMethod: (option: string) => void;
}

export const Dropdown = ({ title, isVisualizationFinished, options, callSetOptionMethod }: DrodownProps) => {
  const [isHover, setIsHover] = useState(false);
  const isAnimationInProgress = useAppSelector(selectIsAnimationInProgress);

  let optionsItem = options.map((option: string) =>
    <div key={option} onClick={() => callSetOptionMethod(option)}> {option} </div>
  )

  function getBgColor() {
    if (isHover) {
      if (isAnimationInProgress || !isVisualizationFinished)
        return "#cccccc"
      else
        return "#22c4dd"
    }
    return ""
  }

  return (
    <div className="dropdown-menu-nav-bar"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <button className="dropbtn"
        style={{ backgroundColor: getBgColor(), height: NAV_MENU_HEIGHT }}>
        <p>
          {title}
          <i
            className="fa fa-caret-down"
            style={{ margin: `0 0 0 0.5rem` }}
          ></i>
        </p>
      </button>
      <div
        className="dropdown-content"
        style={{ visibility: isAnimationInProgress || !isVisualizationFinished ? "hidden" : "visible" }}>
        {optionsItem}
      </div>
    </div>
  )
}