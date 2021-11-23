import { classroomApi, classroomDetailsApi, usersApi, assignmentsApi } from 'services/api';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    [classroomApi.reducerPath]: classroomApi.reducer,
    [classroomDetailsApi.reducerPath]: classroomDetailsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [assignmentsApi.reducerPath]: assignmentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      classroomApi.middleware,
      classroomDetailsApi.middleware,
      usersApi.middleware,
      assignmentsApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
