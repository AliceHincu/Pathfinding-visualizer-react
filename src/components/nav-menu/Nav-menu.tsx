import { HORIZONTAL, RANDOM, RECURSIVE_DIVISON } from '../../constants/algorithms';
import { COLUMN_COUNT, ROW_COUNT } from '../../constants/grid-details';
import { NodeCoords, selectGrid, setGrid, setNode } from '../../redux-features/boardSlice';
import { useAppDispatch, useAppSelector } from '../../redux-features/hooks';
import { randomMaze } from '../../utils/generation-maze/RandomMaze';
import { recursiveDivisionMaze } from '../../utils/generation-maze/RecursiveDivisionMaze'
import { generateInitalGrid, NodeInterface } from '../../utils/GridUtils';
import './Nav-menu.css'

const NavMenu = () => {
    const grid = useAppSelector(selectGrid);
    const dispatch = useAppDispatch();

    const animateMaze = (queue: NodeCoords[]) => {
        for(let i=0; i<queue.length; i++){
            setTimeout(()=>{
                const newNode = {
                    ...grid[queue[i].row][queue[i].col],
                    isWall: true
                }
                dispatch(setNode(newNode))
            }, 10*i)
        }
    }

    const generateWalls = (generationAlgorithm: string) => {
        dispatch(setGrid(generateInitalGrid()))
        let queue: NodeCoords[] = [];
        switch (generationAlgorithm) {
            case RECURSIVE_DIVISON:
                queue = recursiveDivisionMaze(grid, 0, 0, COLUMN_COUNT, ROW_COUNT, HORIZONTAL);
                break;
            case RANDOM:
            default:
                queue = randomMaze(grid, 0.3);
        }
        animateMaze(queue)
    }
    
    return(
        <div className="nav-bar">
            <div className='nav-bar-item'>
                    Pathfinding visualizer
            </div>

            <div className="dropdown">
            <button className="dropbtn">Generate grid
                <i className="fa fa-caret-down" style={{margin:`0 0 0 0.5rem`}}></i>
            </button>
            <div className="dropdown-content">
                <div onClick={() => generateWalls(RECURSIVE_DIVISON)}>Recursive Division</div>
                <div onClick={() => generateWalls(RANDOM)}>Random</div>
            </div>
        </div>
        </div>
    )
}

export default NavMenu