import { useEffect, useState } from "react";
import {
  ANIMATION_MAZE_TIME,
  ANIMATION_PATH_NODE_TIME,
  ANIMATION_VISITED_NODE_TIME,
  A_STAR,
  BFS,
  DFS,
  DIJKSTRA,
  GREEDY_BFS,
  HORIZONTAL,
  RANDOM,
  RECURSIVE_DIVISON,
} from "../../constants/algorithms";
import { COLUMN_COUNT, ROW_COUNT } from "../../constants/grid-details";
import {
  NodeCoords,
  selectGrid,
  selectStartCoords,
  selectTargetCoords,
  setGrid,
  setNode,
  setWallNode,
} from "../../redux-features/boardSlice";
import { useAppDispatch, useAppSelector } from "../../redux-features/hooks";
import { randomMaze } from "../../utils/generation-maze/RandomMaze";
import { recursiveDivisionMaze } from "../../utils/generation-maze/RecursiveDivisionMaze";
import { generateGridWithoutPath, generateInitalGrid, NodeInterface } from "../../utils/GridUtils";
import { bfs, SolutionBFS } from "../../utils/pathfinding-algorithms/bfs";
import DFS_Algo, { SolutionDFS } from "../../utils/pathfinding-algorithms/dfs";
// import { DFS, SolutionDFS } from "../../utils/pathfinding-algorithms/dfs";
import "./Nav-menu.css";

const NavMenu = () => {
  const grid = useAppSelector(selectGrid);
  const startCoords = useAppSelector(selectStartCoords);
  const targetCoords = useAppSelector(selectTargetCoords);
  const dispatch = useAppDispatch();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  
  const undoWallsStartTarget = () => {
    //Make isWall prop false for start and target once the algorithm started
    const newStartNode = {
      row: startCoords.row,
      col: startCoords.col,
      isWall: false
    }
    const newTargetNode = {
      row: targetCoords.row,
      col: targetCoords.col,
      isWall: false
    }
    dispatch(setWallNode(newStartNode))
    dispatch(setWallNode(newTargetNode))
  }

  // useEffect(() => {
  //   console.log(grid)
  // }, [grid])
  

  const updateSelectedAlgorithm = (algorithm: string) => {
    setSelectedAlgorithm(algorithm)
    undoWallsStartTarget();
  }

  const clearPath = () => {
    dispatch(setGrid(generateGridWithoutPath(grid)));
  };

  const clearBoard = () => {
    dispatch(setGrid(generateInitalGrid()));
  };

  const animateMaze = (queue: NodeCoords[]) => {
    let i=0;

    let interval = setInterval(() => { //setInterval because setTimeout causes lag.
      const newNode = {
        ...grid[queue[i].row][queue[i].col],
        isWall: true,
      };
      dispatch(setNode(newNode));

      if(i==queue.length-1){
        clearInterval(interval)
      }
      i++;
    }, ANIMATION_MAZE_TIME)
  };

  const animatePath = (path: NodeCoords[]) => {
    let i=0;
    let interval = setInterval(() => {
      const newNode = {
        ...grid[path[i].row][path[i].col],
        isPath: true,
      };
      dispatch(setNode(newNode));

      if(i==path.length-1){
        clearInterval(interval)
      }

      i++;
    }, ANIMATION_PATH_NODE_TIME)
  };

  const animateVisitedNodes2D = (queue: NodeCoords[][], path: NodeCoords[]) => {
    let i=0;
    let interval = setInterval(() => {
      for(let j=0; j<queue[i].length;j++){
        const newNode = {
          ...grid[queue[i][j].row][queue[i][j].col],
          isVisited: true,
        };
        dispatch(setNode(newNode));
      }

      if(i==queue.length-1){
        clearInterval(interval)
        animatePath(path)
      }

      i++;
    }, ANIMATION_VISITED_NODE_TIME)
  };

  const animateVisitedNodes1D = (stack: NodeCoords[], path: NodeCoords[]) => {
    let i=0;
    let interval = setInterval(() => { //setInterval because setTimeout causes lag.
      const newNode = {
        ...grid[stack[i].row][stack[i].col],
        isVisited: true,
      };

      dispatch(setNode(newNode));
      
      if(i==stack.length-1){
        clearInterval(interval)
        animatePath(path)
      }

      i++;
    }, ANIMATION_VISITED_NODE_TIME*2)
  };

  const generateWalls = (generationAlgorithm: string) => {
    clearBoard();
    let queue: NodeCoords[] = [];

    switch (generationAlgorithm) {
      case RECURSIVE_DIVISON:
        queue = recursiveDivisionMaze(grid, 0, 0, COLUMN_COUNT, ROW_COUNT, HORIZONTAL);
        break;
      case RANDOM:
      default:
        queue = randomMaze(grid, 0.3);
    }

    animateMaze(queue);
  };

  const runAlgorithm = () => {
    switch (selectedAlgorithm) {
      case BFS:
        const solBsf: SolutionBFS = bfs(grid, [startCoords.row, startCoords.col], [targetCoords.row, targetCoords.col]);
        animateVisitedNodes2D(solBsf.queueVisitedAnimated, solBsf.path);
        break;
      case DFS:
        const solDfs:SolutionDFS|undefined = new DFS_Algo(grid, [startCoords.row, startCoords.col], [targetCoords.row, targetCoords.col]).run();
        console.log(solDfs);
        animateVisitedNodes1D(solDfs.queueVisitedAnimated, solDfs.path)
        break;
    }
  };

  return (
    <div className="nav-bar">
      <div className="nav-bar-item">Pathfinding visualizer</div>

      <div className="dropdown">
        <button className="dropbtn">
          Generate grid
          <i
            className="fa fa-caret-down"
            style={{ margin: `0 0 0 0.5rem` }}
          ></i>
        </button>
        <div className="dropdown-content">
          <div onClick={() => generateWalls(RECURSIVE_DIVISON)}>
            {RECURSIVE_DIVISON}
          </div>
          <div onClick={() => generateWalls(RANDOM)}>{RANDOM}</div>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          Generate algorithm
          <i
            className="fa fa-caret-down"
            style={{ margin: `0 0 0 0.5rem` }}
          ></i>
        </button>
        <div className="dropdown-content">
          <div onClick={() => updateSelectedAlgorithm(DFS)}>{DFS}</div>
          <div onClick={() => updateSelectedAlgorithm(BFS)}>{BFS}</div>
          <div onClick={() => updateSelectedAlgorithm(GREEDY_BFS)}>{GREEDY_BFS}</div>
          <div onClick={() => updateSelectedAlgorithm(DIJKSTRA)}>{DIJKSTRA}</div>
          <div onClick={() => updateSelectedAlgorithm(A_STAR)}>{A_STAR}</div>
        </div>
      </div>

      <div className="visualize-btn" onClick={() => runAlgorithm()}>
        Visualize!
      </div>

      <div className="nav-bar-item" onClick={clearPath}>
        Clear path
      </div>
      <div className="nav-bar-item" onClick={clearBoard}>
        Clear board
      </div>
    </div>
  );
};

export default NavMenu;
