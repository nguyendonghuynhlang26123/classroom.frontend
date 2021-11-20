import { usersApi } from './../services/api/user.api';
import { classroomApi, classroomDetailsApi } from 'services/api';
import { configureStore } from '@reduxjs/toolkit';
import { loadingReducer, messageReducer } from './slices';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    message: messageReducer,
    [classroomApi.reducerPath]: classroomApi.reducer,
    [classroomDetailsApi.reducerPath]: classroomDetailsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(classroomApi.middleware, classroomDetailsApi.middleware, usersApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
