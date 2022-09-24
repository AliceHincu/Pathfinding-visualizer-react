import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NOT_PRESSED, PRESSED } from '../constants/mouse'
import type {RootState} from '../store'
import { generateInitalGrid, NodeInterface } from '../utils/GridUtils'

interface BoardState {
  grid: NodeInterface[][]
  mouse: string
}

const initialState: BoardState = {
  grid: generateInitalGrid(),
  mouse: NOT_PRESSED
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    toggleWallNode: (state, action: PayloadAction<{row: number, col: number}>) => {
      const row = action.payload.row;
      const col = action.payload.col;
      const oldNode = state.grid[row][col];
      const newNode = {
            ...oldNode,
            isWall: !oldNode.isWall
        };
      state.grid[row][col] = newNode;
    },
    mousePressed: (state) => {
      state.mouse = PRESSED
    },
    mouseNotPressed: (state) => {
      state.mouse = NOT_PRESSED
    }
    // setStartNode: (state, action: PayloadAction<string>) => {
    //   state.type = action.payload
    // }
  }
})

export const { toggleWallNode, mousePressed, mouseNotPressed } = boardSlice.actions
export const selectGrid = (state: RootState) => state.board.grid
export const selectMouse = (state: RootState) => state.board.mouse
export default boardSlice.reducer