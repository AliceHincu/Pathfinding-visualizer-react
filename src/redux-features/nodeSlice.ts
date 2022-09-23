import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from '../store'

interface NodeState {
  type: string
}

const initialState: NodeState = {
  type: 'unvisited',
}

export const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    changeType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    }
  }
})

export const { changeType } = nodeSlice.actions
export const selectNodeType = (state: RootState) => state.node.type
export default nodeSlice.reducer