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
} from "../../redux-features/boardSlice";
import { useAppDispatch, useAppSelector } from "../../redux-features/hooks";
import { randomMaze } from "../../utils/generation-maze/RandomMaze";
import { recursiveDivisionMaze } from "../../utils/generation-maze/RecursiveDivisionMaze";
import { generateInitalGrid, NodeInterface } from "../../utils/GridUtils";
import { bfs, SolutionBFS } from "../../utils/pathfinding-algorithms/bfs";
import "./Nav-menu.css";

const NavMenu = () => {
  const grid = useAppSelector(selectGrid);
  const startCoords = useAppSelector(selectStartCoords);
  const targetCoords = useAppSelector(selectTargetCoords);
  const dispatch = useAppDispatch();
  
  const undoWallsStartTarget = () => {
    //Make isWall prop false for start and target once the algorithm started
    const newStartNode = {
      ...grid[startCoords.row][startCoords.col],
      isWall: false
    }
    const newTargetNode = {
      ...grid[targetCoords.row][targetCoords.col],
      isWall: false
    }
    dispatch(setNode(newStartNode))
    dispatch(setNode(newTargetNode))
  }

  const clearPath = () => {};

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
    let interval = setInterval(() => { //setInterval because setTimeout causes lag.
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

  const animateVisitedNodes = (queue: NodeCoords[][], path: NodeCoords[]) => {
    let i=0;
    let interval = setInterval(() => { //setInterval because setTimeout causes lag.
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

  const runAlgorithm = (pathfindingAlgorithm: string) => {
    undoWallsStartTarget();
    switch (pathfindingAlgorithm) {
      case BFS:
        const sol: SolutionBFS = bfs(grid, [startCoords.row, startCoords.col], [targetCoords.row, targetCoords.col]);
        animateVisitedNodes(sol.queueVisitedAnimated, sol.path);
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
            Recursive Division
          </div>
          <div onClick={() => generateWalls(RANDOM)}>Random</div>
        </div>
      </div>

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
          Generate grid
          <i
            className="fa fa-caret-down"
            style={{ margin: `0 0 0 0.5rem` }}
          ></i>
        </button>
        <div className="dropdown-content">
          <div onClick={() => runAlgorithm(DFS)}>{DFS}</div>
          <div onClick={() => runAlgorithm(BFS)}>{BFS}</div>
          <div onClick={() => runAlgorithm(GREEDY_BFS)}>{GREEDY_BFS}</div>
          <div onClick={() => runAlgorithm(DIJKSTRA)}>{DIJKSTRA}</div>
          <div onClick={() => runAlgorithm(A_STAR)}>{A_STAR}</div>
        </div>
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
