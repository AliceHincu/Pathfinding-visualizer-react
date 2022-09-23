import { configureStore } from '@reduxjs/toolkit'
import nodeReducer from './redux-features/nodeSlice'
import boardReducer from './redux-features/boardSlice'
// ...

export const store = configureStore({
  reducer: {
    node: nodeReducer,
    board: boardReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch