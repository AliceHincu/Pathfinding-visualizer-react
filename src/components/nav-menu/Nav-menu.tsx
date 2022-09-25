import { COLUMN_COUNT, ROW_COUNT } from '../../constants/grid-details';
import { selectGrid, setGrid } from '../../redux-features/boardSlice';
import { useAppDispatch, useAppSelector } from '../../redux-features/hooks';
import { recursiveDivisionMaze } from '../../utils/generation-maze/RecursiveDivisionMaze'
import { generateInitalGrid } from '../../utils/GridUtils';
import './Nav-menu.css'

const NavMenu = () => {
    const grid = useAppSelector(selectGrid);
    const dispatch = useAppDispatch();

    const generateWalls = (generationAlgorithm: string) => {
        const newGrid = recursiveDivisionMaze(generateInitalGrid(), 0, 0, COLUMN_COUNT, ROW_COUNT, "horizontal");
        // const newGrid = generate(generateInitalGrid());
        console.log(newGrid)
        dispatch(setGrid(newGrid))
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