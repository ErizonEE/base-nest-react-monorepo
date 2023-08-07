import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    userReducer: UserReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
