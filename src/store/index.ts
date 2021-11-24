import { classroomApi, classroomDetailsApi, usersApi, assignmentsApi, topicsApi } from 'services/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
export const store = configureStore({
  reducer: {
    [classroomApi.reducerPath]: classroomApi.reducer,
    [classroomDetailsApi.reducerPath]: classroomDetailsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    [assignmentsApi.reducerPath]: assignmentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      classroomApi.middleware,
      classroomDetailsApi.middleware,
      usersApi.middleware,
      topicsApi.middleware,
      assignmentsApi.middleware,
    ),
});

// enable listener behavior for the store
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
