import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL } from '../constants/grid-details'
import type {RootState} from '../store'
import { generateInitalGrid, NodeInterface } from '../utils/GridUtils'

interface BoardState {
  grid: NodeInterface[][],
  startNodeCoords: {
    row: number,
    col: number
  },
  targetNodeCoords: {
    row: number,
    col: number
  },
  mouse: boolean,
  startDragged: boolean,
  targetDragged: boolean,
}

const initialState: BoardState = {
  grid: generateInitalGrid({row: START_NODE_ROW, col: START_NODE_COL}, {row: FINISH_NODE_ROW, col: FINISH_NODE_COL}),
  startNodeCoords: {
    row: START_NODE_ROW,
    col: START_NODE_COL
  },
  targetNodeCoords: {
    row: FINISH_NODE_ROW,
    col: FINISH_NODE_COL
  },
  mouse: false,
  startDragged: false,
  targetDragged: false,
}

export interface NodeCoords {
  row: number, 
  col: number
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setGrid: (state, action: PayloadAction<NodeInterface[][]>) => {
      state.grid = action.payload
    },
    setNode: (state, action: PayloadAction<NodeInterface>) => {
      state.grid[action.payload.row][action.payload.col] = {...action.payload};
    },
    setWallNode: (state, action: PayloadAction<{row: number, col: number, isWall: boolean}>) => {
      const row = action.payload.row;
      const col = action.payload.col;
      state.grid[row][col].isWall = action.payload.isWall;
    },
    setStartNode: (state, action:PayloadAction<NodeCoords>) => {
      const oldStartRow = state.startNodeCoords.row;
      const oldStartCol = state.startNodeCoords.col;
      const newStartRow = action.payload.row;
      const newStartCol = action.payload.col;
      
      state.grid[oldStartRow][oldStartCol].isStart = false;
      state.grid[newStartRow][newStartCol].isStart = true;
      state.startNodeCoords.row = newStartRow;
      state.startNodeCoords.col = newStartCol
    },
    setTargetNode: (state, action:PayloadAction<NodeCoords>) => {
      const oldTargetRow = state.targetNodeCoords.row;
      const oldTargetCol = state.targetNodeCoords.col;
      const newTargetRow = action.payload.row;
      const newTargetCol = action.payload.col;
      
      state.grid[oldTargetRow][oldTargetCol].isFinish = false;
      state.grid[newTargetRow][newTargetCol].isFinish = true;      
      state.targetNodeCoords.row = newTargetRow;
      state.targetNodeCoords.col = newTargetCol
    },
    isMousePressed: (state, action: PayloadAction<boolean>) => {
      state.mouse = action.payload
    },
    startIsDragged: (state, action: PayloadAction<boolean>) => {
      state.startDragged = action.payload
    },
    targetIsDragged: (state, action: PayloadAction<boolean>) => {
      state.targetDragged = action.payload
    }
  }
})

export const { setNode, setGrid, setWallNode, setStartNode, setTargetNode, isMousePressed, startIsDragged, targetIsDragged } = boardSlice.actions;
export const selectGrid = (state: RootState) => state.board.grid;
export const selectMouse = (state: RootState) => state.board.mouse;
export const selectIsStartDragged = (state: RootState) => state.board.startDragged;
export const selectIsTargetDragged = (state: RootState) => state.board.targetDragged;
export const selectStartCoords = (state: RootState) => state.board.startNodeCoords;
export const selectTargetCoords = (state: RootState) => state.board.targetNodeCoords;
export default boardSlice.reducer