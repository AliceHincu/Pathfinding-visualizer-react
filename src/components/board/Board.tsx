import { selectGrid } from "../../redux-features/boardSlice"
import { useAppSelector } from "../../redux-features/hooks"
import { generateNodeKey } from "../../utils/GridUtils";
import Node from "./Node";
import './Board.css';

const Board = () => {
    const grid = useAppSelector(selectGrid);

    return(
        <div className="grid">
          {
            grid.map((row, rowIndex) => {
              return (
                <div className="grid-row" key={rowIndex}>
                  {
                    row.map((node, colIndex) => {
                      return (
                        <Node 
                          key={generateNodeKey(rowIndex, colIndex)}
                          node={node}
                        />);
                    })
                  }
                </div>
              )
            })
          }
        </div>
    )
//     return (
//         <div className="board" style={{gridTemplateColumns:`repeat(${COLUMN_COUNT}, ${SQUARE_SIZE}px)`, gridTemplateRows:`repeat(${ROW_COUNT}, ${SQUARE_SIZE}px)`}}>
//         {
//             grid.map( (row,i) => { return (
//                 row.map((node,j) => {
//                     return (<Node key = {`${i}+${j}`}  
//                         onMouseDown = {handleMouseDown} 
//                         onMouseEnter = {handleMouseEnter}
//                         onMouseLeave = {handleMouseLeave}
//                         onMouseUp  = {handleMouseUp}
//                         isHeld = {isHeld}
//                         nodeDraggedType = {nodeDraggedType}
//                         nodeVal = {board[i][j]} 
//                         row = {i} 
//                         col = {j}>
//                     </Node>)
//             })  
//             )     })
//         }
//       </div>
//   )
}

export default Board