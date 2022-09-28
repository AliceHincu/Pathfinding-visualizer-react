import { selectGrid, selectIsAnimationInProgress } from "../../redux-features/boardSlice"
import { useAppSelector } from "../../redux-features/hooks"
import { generateNodeKey } from "../../utils/GridUtils";
import Node from "./Node";
import './Board.css';

const Board = () => {
  const grid = useAppSelector(selectGrid);
  const isAnimationInProgress = useAppSelector(selectIsAnimationInProgress);

  return (
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
                      isAnimationInProgress={isAnimationInProgress}
                    />);
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Board