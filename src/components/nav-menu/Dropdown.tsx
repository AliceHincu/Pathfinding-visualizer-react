interface DrodownProps{
  title: string;
  isAnimationInProgress: boolean;
  isVisualizationFinished: boolean;
  options: string[];
  callSetOptionMethod: (option: string) => void;
}

export const Dropdown = ({title, isAnimationInProgress, isVisualizationFinished, options, callSetOptionMethod}:DrodownProps) => {
  let optionsItem = options.map((option:string) => 
    <div onClick={() => callSetOptionMethod(option)}> {option} </div>
  )
  return (
    <div className="dropdown">
      <button className="dropbtn"
        style = {{backgroundColor:  isAnimationInProgress || !isVisualizationFinished ? "#cccccc" : ""}}>
        {title}
        <i
          className="fa fa-caret-down"
          style={{ margin: `0 0 0 0.5rem` }}
        ></i>
      </button>
      <div 
        className="dropdown-content" 
        style={{ visibility: isAnimationInProgress || !isVisualizationFinished ? "hidden" : "visible" }}>
          {optionsItem}
      </div>
    </div>
  )
}