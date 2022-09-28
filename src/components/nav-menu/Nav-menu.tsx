import { useState } from "react";
import {
  ANIMATION_MAZE_TIME,
  ANIMATION_PATH_NODE_TIME,
  ANIMATION_VISITED_NODE_TIME,
  A_STAR,
  BFS,
  DFS,
  GREEDY_BFS,
  HORIZONTAL,
  RANDOM,
  RECURSIVE_DIVISON,
} from "../../constants/algorithms";
import { NAV_MENU_HEIGHT } from "../../constants/dimensions";
import { COLUMN_COUNT, ROW_COUNT } from "../../constants/grid-details";
import {
  NodeCoords,
  selectGrid,
  selectStartCoords,
  selectTargetCoords,
  setGrid,
  setNode,
  setAnimationInProgress
} from "../../redux-features/boardSlice";
import { useAppDispatch, useAppSelector } from "../../redux-features/hooks";
import { randomMaze } from "../../utils/generation-maze/RandomMaze";
import { recursiveDivisionMaze } from "../../utils/generation-maze/RecursiveDivisionMaze";
import { generateGridWithoutPath, generateInitalGrid } from "../../utils/GridUtils";
import ASTAR_Algo from "../../utils/pathfinding-algorithms/aStar";
import BFS_Algo from "../../utils/pathfinding-algorithms/bfs";
import DFS_Algo from "../../utils/pathfinding-algorithms/dfs";
import GREEDY_Algo from "../../utils/pathfinding-algorithms/greedy";
import { IAlgorithm, SolutionAlgo } from "../../utils/pathfinding-algorithms/IAlgorithm";
import { ClearButton } from "./ClearButton";
import { Dropdown } from "./Dropdown";
import "./Nav-menu.css";
import { VisualizeButton } from "./VisualizeButton";

const NavMenu = () => {
  const grid = useAppSelector(selectGrid);
  const startCoords = useAppSelector(selectStartCoords);
  const targetCoords = useAppSelector(selectTargetCoords);
  const dispatch = useAppDispatch();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(BFS);
  const [isAnimationInProgress, setIsAnimationInProgress] = useState(false);
  const [isVisualizationFinished, setIsVisualizationFinished] = useState(true);

  const clearPath = () => {
    dispatch(setGrid(generateGridWithoutPath(grid)));
    setIsVisualizationFinished(true);
  };

  const clearBoard = () => {
    dispatch(setGrid(generateInitalGrid(startCoords, targetCoords)));
    setIsVisualizationFinished(true);
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
        clearInterval(interval)
        setIsAnimationInProgress(false)
        dispatch(setAnimationInProgress(false))
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
        dispatch(setAnimationInProgress(false));
      }

      i++;
    }, ANIMATION_PATH_NODE_TIME)
  };

  const animateVisitedNodes = (stack: NodeCoords[], path: NodeCoords[]) => {
    let i = 0;
    if (stack.length === 0) {
      setIsAnimationInProgress(false);
      dispatch(setAnimationInProgress(false));
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
    dispatch(setAnimationInProgress(true))
    animateMaze(queue);
  };

  const runAlgorithm = () => {
    clearPath()
    setIsAnimationInProgress(true);
    dispatch(setAnimationInProgress(true));
    setIsVisualizationFinished(false);
    

    let map = new Map<string, any>([
      [BFS, new BFS_Algo(grid, grid[startCoords.row][startCoords.col], grid[targetCoords.row][targetCoords.col])],
      [DFS, new DFS_Algo(grid, grid[startCoords.row][startCoords.col], grid[targetCoords.row][targetCoords.col])],
      [GREEDY_BFS, new GREEDY_Algo(grid, grid[startCoords.row][startCoords.col], grid[targetCoords.row][targetCoords.col])],
      [A_STAR, new ASTAR_Algo(grid, grid[startCoords.row][startCoords.col], grid[targetCoords.row][targetCoords.col])],
    ])

    const sol: SolutionAlgo = map.get(selectedAlgorithm).run();
    animateVisitedNodes(sol.queueVisitedAnimated, sol.path);
  };

  return (
    <div className="nav-bar" style={{ height: NAV_MENU_HEIGHT }}>
      <Dropdown
        title={"Generate maze"}
        isVisualizationFinished={isVisualizationFinished}
        options={[RECURSIVE_DIVISON, RANDOM]}
        callSetOptionMethod={generateWalls}
      ></Dropdown>
      <Dropdown
        title={"Generate algorithm"}
        isVisualizationFinished={isVisualizationFinished}
        options={[BFS, DFS, GREEDY_BFS, A_STAR]}
        callSetOptionMethod={(algorithm: string) => setSelectedAlgorithm(algorithm)}
      ></Dropdown>

      <VisualizeButton
        selectedAlgorithm={selectedAlgorithm}
        isVisualizationFinished={isVisualizationFinished}
        callSetOptionMethod={runAlgorithm}
      ></VisualizeButton>

      <ClearButton
        text={"Clear path"}
        callSetOptionMethod={clearPath}
      ></ClearButton>

      <ClearButton
        text={"Clear board"}
        callSetOptionMethod={clearBoard}
      ></ClearButton>
    </div>
  );
};

export default NavMenu;
