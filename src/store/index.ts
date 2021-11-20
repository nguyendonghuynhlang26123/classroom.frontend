import { classroomApi } from 'services/api';
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { loadingReducer, messageReducer } from './slices';
import { Reducer } from 'redux';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    message: messageReducer,
    [classroomApi.reducerPath]: classroomApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(classroomApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
