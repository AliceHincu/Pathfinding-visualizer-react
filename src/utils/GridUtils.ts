import { COLUMN_COUNT, FINISH_NODE_COL, FINISH_NODE_ROW, ROW_COUNT, START_NODE_COL, START_NODE_ROW } from "../constants/grid-details";
import { NodeCoords } from "../redux-features/boardSlice";

export interface NodeInterface {
    row: number,
    col: number,
    isStart: boolean,
    isFinish: boolean,
    distance: number,
    isVisited: boolean,
    isPath: boolean,
    isWall: boolean,
}

let start: NodeCoords;
let target: NodeCoords;

function NodeFactory(row: number, col: number) {
    return {
        row,
        col,
        isStart: row === start.row && col === start.col,
        isFinish: row === target.row && col === target.col,
        distance: Infinity,
        isVisited: false,
        isPath: false,
        isWall: false,
      };
}

export const generateInitalGrid = (startCoords: NodeCoords, targetCoords: NodeCoords) => {
    const grid = [];
    start = startCoords;
    target = targetCoords;

    for(let row = 0; row < ROW_COUNT; row++) {
        const currentRow = [];

        for(let col = 0; col < COLUMN_COUNT; col++) {
            currentRow.push(NodeFactory(row, col));
        }

        grid.push(currentRow);
    }

    return grid;
}

export const generateGridWithoutPath = (initialGrid: NodeInterface[][]): NodeInterface[][] => {
    let newGrid: NodeInterface[][] = []

    for(let row = 0; row < ROW_COUNT; row++) {
        const currentRow = [];

        for(let col = 0; col < COLUMN_COUNT; col++) {
            const node = {
                ...initialGrid[row][col],
                isVisited: false,
                isPath: false
            }
            currentRow.push(node);
        }

        newGrid.push(currentRow);
    }

    return newGrid;
}

export const generateNodeKey = (row: number, col: number) => {
    return (row * ROW_COUNT + col).toString();
}