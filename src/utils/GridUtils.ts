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
    hCost: number,
    gCost: number,
    fCost: number
}

let start: NodeCoords;
let target: NodeCoords;

export const direction = {
    row: [-1, 0, 1, 0],
    col: [0, 1, 0, -1]
}

function NodeFactory(row: number, col: number): NodeInterface {
    return {
        row,
        col,
        isStart: row === start.row && col === start.col,
        isFinish: row === target.row && col === target.col,
        distance: Infinity,
        isVisited: false,
        isPath: false,
        isWall: false,
        hCost: 0,
        gCost: 0,
        fCost: 0
    };
}

export const generateInitalGrid = (startCoords: NodeCoords, targetCoords: NodeCoords) => {
    const grid = [];
    start = startCoords;
    target = targetCoords;

    for (let row = 0; row < ROW_COUNT; row++) {
        const currentRow = [];

        for (let col = 0; col < COLUMN_COUNT; col++) {
            currentRow.push(NodeFactory(row, col));
        }

        grid.push(currentRow);
    }

    return grid;
}

export const generateGridWithoutPath = (initialGrid: NodeInterface[][]): NodeInterface[][] => {
    let newGrid: NodeInterface[][] = []

    for (let row = 0; row < ROW_COUNT; row++) {
        const currentRow = [];

        for (let col = 0; col < COLUMN_COUNT; col++) {
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

export const generateNodeKey = (row: number, col: number): string => {
    return (row * ROW_COUNT + col).toString();
}

export const deepCopyGrid = (grid: NodeInterface[][]): NodeInterface[][] => {
    return grid.map(function (arr) {
        return arr.slice();
    });
}

export const getMapKey = (node: NodeInterface|NodeCoords): string => {
    return [node.row, node.col].toString();
}