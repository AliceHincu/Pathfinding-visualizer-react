import { COLUMN_COUNT, FINISH_NODE_COL, FINISH_NODE_ROW, ROW_COUNT, START_NODE_COL, START_NODE_ROW } from "../constants/grid-details";

export interface NodeInterface {
    row: number,
    col: number,
    isStart: boolean,
    isFinish: boolean,
    distance: number,
    isVisited: boolean,
    isWall: boolean,
}

function NodeFactory(row: number, col: number) {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
      };
}

export const generateInitalGrid = () => {
    const grid = [];

    for(let row = 0; row < ROW_COUNT; row++) {
        const currentRow = [];

        for(let col = 0; col < COLUMN_COUNT; col++) {
            currentRow.push(NodeFactory(row, col));
        }

        grid.push(currentRow);
    }

    return grid;
}

export const generateNodeKey = (row: number, col: number) => {
    return (row * ROW_COUNT + col).toString();
}