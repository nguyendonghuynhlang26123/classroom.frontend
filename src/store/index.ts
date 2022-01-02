import { loadingSlice, cleanUpSlice } from './slices';
import { classroomApi, classroomDetailsApi, usersApi, assignmentsApi, uploadApi, classStudentApi, gradeApi, streamApi } from 'services/api';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const combinedReducer = combineReducers({
  [loadingSlice.name]: loadingSlice.reducer,
  [cleanUpSlice.name]: cleanUpSlice.reducer,
  [classroomApi.reducerPath]: classroomApi.reducer,
  [classroomDetailsApi.reducerPath]: classroomDetailsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  [assignmentsApi.reducerPath]: assignmentsApi.reducer,
  [classStudentApi.reducerPath]: classStudentApi.reducer,
  [gradeApi.reducerPath]: gradeApi.reducer,
  [streamApi.reducerPath]: streamApi.reducer,
});

const rootReducer = (state: any, action: any): any => {
  if (action.type === 'cleanup/cleanUp') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      classroomApi.middleware,
      classroomDetailsApi.middleware,
      usersApi.middleware,
      uploadApi.middleware,
      assignmentsApi.middleware,
      classStudentApi.middleware,
      gradeApi.middleware,
      streamApi.middleware,
    ),
});

// enable listener behavior for the store
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
