import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NOT_PRESSED, PRESSED } from '../constants/mouse'
import { START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL } from '../constants/grid-details'
import type {RootState} from '../store'
import { generateInitalGrid, NodeInterface } from '../utils/GridUtils'

interface BoardState {
  grid: NodeInterface[][],
  startNode: {
    row: number,
    col: number
  },
  targetNode: {
    row: number,
    col: number
  },
  mouse: boolean,
  startDragged: boolean,
  targetDragged: boolean,
}

const initialState: BoardState = {
  grid: generateInitalGrid(),
  startNode: {
    row: START_NODE_ROW,
    col: START_NODE_COL
  },
  targetNode: {
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
    setWallNode: (state, action: PayloadAction<{row: number, col: number, isWall: boolean}>) => {
      const row = action.payload.row;
      const col = action.payload.col;
      state.grid[row][col].isWall = action.payload.isWall;
    },
    setStartNode: (state, action:PayloadAction<NodeCoords>) => {
      const oldStartRow = state.startNode.row;
      const oldStartCol = state.startNode.col;
      const newStartRow = action.payload.row;
      const newStartCol = action.payload.col;
      
      state.grid[oldStartRow][oldStartCol].isStart = false;
      state.grid[newStartRow][newStartCol].isStart = true;
      state.startNode.row = newStartRow;
      state.startNode.col = newStartCol
    },
    setTargetNode: (state, action:PayloadAction<NodeCoords>) => {
      const oldTargetRow = state.targetNode.row;
      const oldTargetCol = state.targetNode.col;
      const newTargetRow = action.payload.row;
      const newTargetCol = action.payload.col;
      
      state.grid[oldTargetRow][oldTargetCol].isFinish = false;
      state.grid[newTargetRow][newTargetCol].isFinish = true;
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

export const { setGrid, setWallNode, setStartNode, setTargetNode, isMousePressed, startIsDragged, targetIsDragged } = boardSlice.actions
export const selectGrid = (state: RootState) => state.board.grid
export const selectMouse = (state: RootState) => state.board.mouse
export const selectStart = (state: RootState) => state.board.startDragged
export const selectTarget = (state: RootState) => state.board.targetDragged
export default boardSlice.reducer