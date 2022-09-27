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
import ASTAR_Algo, { SolutionASTAR } from "../../utils/pathfinding-algorithms/aStar";
import { bfs, SolutionBFS } from "../../utils/pathfinding-algorithms/bfs";
import DFS_Algo, { SolutionDFS } from "../../utils/pathfinding-algorithms/dfs";
import { Dropdown } from "./Dropdown";
// import { DFS, SolutionDFS } from "../../utils/pathfinding-algorithms/dfs";
import "./Nav-menu.css";

const NavMenu = () => {
  const grid = useAppSelector(selectGrid);
  const startCoords = useAppSelector(selectStartCoords);
  const targetCoords = useAppSelector(selectTargetCoords);
  const dispatch = useAppDispatch();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [isAnimationInProgress, setIsAnimationInProgress] = useState(false);
  const [isVisualizationFinished, setIsVisualizationFinished] = useState(true);

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

  const updateSelectedAlgorithm = (algorithm: string) => {
    setSelectedAlgorithm(algorithm)
    clearPath()
    undoWallsStartTarget();
  }

  const clearPath = () => {
    if (!isAnimationInProgress) {
      dispatch(setGrid(generateGridWithoutPath(grid)));
      setIsVisualizationFinished(true);
    }

  };

  const clearBoard = () => {
    if (!isAnimationInProgress) {
      dispatch(setGrid(generateInitalGrid(startCoords, targetCoords)));
      setIsVisualizationFinished(true);
    }
  };

  const animateMaze = (queue: NodeCoords[]) => {
    let i = 0;

    let interval = setInterval(() => { //setInterval because setTimeout causes lag.
      const newNode = {
        ...grid[queue[i].row][queue[i].col],
        isWall: true,
      };
      dispatch(setNode(newNode));

      if (i == queue.length - 1) {
        undoWallsStartTarget()
        clearInterval(interval)
        setIsAnimationInProgress(false)
      }
      i++;
    }, ANIMATION_MAZE_TIME)
  };

  const animatePath = (path: NodeCoords[]) => {
    let i = 0;
    let interval = setInterval(() => {
      const newNode = {
        ...grid[path[i].row][path[i].col],
        isPath: true,
      };
      dispatch(setNode(newNode));

      if (i == path.length - 1) {
        clearInterval(interval)
        setIsAnimationInProgress(false);
      }

      i++;
    }, ANIMATION_PATH_NODE_TIME)
  };

  const animateVisitedNodes2D = (queue: NodeCoords[][], path: NodeCoords[]) => {
    let i = 0;
    if (queue.length === 0) {
      setIsAnimationInProgress(false);
      return;
    }

    let interval = setInterval(() => {
      for (let j = 0; j < queue[i].length; j++) {
        const newNode = {
          ...grid[queue[i][j].row][queue[i][j].col],
          isVisited: true,
        };
        dispatch(setNode(newNode));
      }

      if (i == queue.length - 1) {
        clearInterval(interval)
        animatePath(path)
      }

      i++;
    }, ANIMATION_VISITED_NODE_TIME)
  };

  const animateVisitedNodes1D = (stack: NodeCoords[], path: NodeCoords[]) => {
    let i = 0;
    if (stack.length === 0) {
      setIsAnimationInProgress(false);
      return;
    }

    let interval = setInterval(() => { //setInterval because setTimeout causes lag.
      const newNode = {
        ...grid[stack[i].row][stack[i].col],
        isVisited: true,
      };

      dispatch(setNode(newNode));

      if (i == stack.length - 1) {
        clearInterval(interval)
        animatePath(path)
      }

      i++;
    }, ANIMATION_VISITED_NODE_TIME * 2)
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

    setIsAnimationInProgress(true)
    animateMaze(queue);
  };

  const runAlgorithm = () => {
    setIsAnimationInProgress(true);
    setIsVisualizationFinished(false);
    switch (selectedAlgorithm) {
      case BFS:
        const solBsf: SolutionBFS = bfs(grid, [startCoords.row, startCoords.col], [targetCoords.row, targetCoords.col]);
        animateVisitedNodes2D(solBsf.queueVisitedAnimated, solBsf.path);
        break;
      case DFS:
        const solDfs: SolutionDFS | undefined = new DFS_Algo(grid, [startCoords.row, startCoords.col], [targetCoords.row, targetCoords.col]).run();
        animateVisitedNodes1D(solDfs.queueVisitedAnimated, solDfs.path)
        break;
      case A_STAR:
        const solAstar: SolutionASTAR = new ASTAR_Algo(grid, grid[startCoords.row][startCoords.col], grid[targetCoords.row][targetCoords.col]).run();
        animateVisitedNodes1D(solAstar.queueVisitedAnimated, solAstar.path)
        break;
    }
  };

  return (
    <div className="nav-bar">
      <Dropdown
        title={"Generate maze"}
        isAnimationInProgress={isAnimationInProgress}
        isVisualizationFinished={isVisualizationFinished}
        options={[RECURSIVE_DIVISON, RANDOM]}
        callSetOptionMethod={generateWalls}
      ></Dropdown>
      <Dropdown
        title={"Generate algorithm"}
        isAnimationInProgress={isAnimationInProgress}
        isVisualizationFinished={isVisualizationFinished}
        options={[BFS, DFS, GREEDY_BFS, DIJKSTRA, A_STAR]}
        callSetOptionMethod={updateSelectedAlgorithm}
      ></Dropdown>

      <div className="nav-bar-item" >
        <button disabled={(isAnimationInProgress || !isVisualizationFinished)} className="visualize-btn" onClick={() => runAlgorithm()}> Visualize {selectedAlgorithm}! </button>
      </div>

      <div className="nav-bar-item" onClick={clearPath}>
        <p>Clear path</p>
      </div>
      <div className="nav-bar-item" onClick={clearBoard}>
        <p>Clear board</p>
      </div>
    </div>
  );
};

export default NavMenu;
