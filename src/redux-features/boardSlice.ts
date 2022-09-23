import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from '../store'
import { generateInitalGrid, NodeInterface } from '../utils/GridUtils'

interface BoardState {
  grid: NodeInterface[][]
}

const initialState: BoardState = {
  grid: generateInitalGrid(),
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // setStartNode: (state, action: PayloadAction<string>) => {
    //   state.type = action.payload
    // }
  }
})

// export const { changeType } = nodeSlice.actions
export const selectGrid = (state: RootState) => state.board.grid
export default boardSlice.reducer