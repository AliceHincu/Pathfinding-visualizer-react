import { HORIZONTAL } from '../../constants/algorithms';
import { COLUMN_COUNT, ROW_COUNT } from '../../constants/grid-details';
import { NodeCoords, selectGrid, setNode } from '../../redux-features/boardSlice';
import { useAppDispatch, useAppSelector } from '../../redux-features/hooks';
import { recursiveDivisionMaze } from '../../utils/generation-maze/RecursiveDivisionMaze'
import { generateInitalGrid } from '../../utils/GridUtils';
import './Nav-menu.css'

const NavMenu = () => {
    const grid = useAppSelector(selectGrid);
    const dispatch = useAppDispatch();

    const animate = (queue: NodeCoords[]) => {
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
        const queue = recursiveDivisionMaze(generateInitalGrid(), 0, 0, COLUMN_COUNT, ROW_COUNT, HORIZONTAL);
        animate(queue)
    }
    
    return(
        <div className="nav-bar">
            <div className='nav-bar-item'>
                    Generate Random Grid
            </div>

            <div className="dropdown">
            <button className="dropbtn">Generate grid
                <i className="fa fa-caret-down" style={{margin:`0 0 0 0.5rem`}}></i>
            </button>
            <div className="dropdown-content">
                <div onClick={() => generateWalls('recursive-division')}>Recursive Division</div>
                <div onClick={() => generateWalls('random')}>Random</div>
            </div>
        </div>
        </div>
    )
}

export default NavMenu