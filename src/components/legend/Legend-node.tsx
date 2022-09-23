import { SQUARE_SIZE } from "../../constants/dimensions";

interface LegendNodeProps {
    title: string,
    classNameNode: string,
    updateCallbackFunction: (className: string) => void,
  }

const LegendNode = ({title, classNameNode, updateCallbackFunction}: LegendNodeProps) => {
    return(
        <div className='column-container'>
            <button 
              className={classNameNode}
              style={{width:`${SQUARE_SIZE}px`, height:`${SQUARE_SIZE}px`}}
              onClick={() => updateCallbackFunction(classNameNode)}
            ></button>
            <p>{title}</p>
        </div>
    )
}

export default LegendNode;