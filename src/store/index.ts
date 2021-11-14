import { combineReducers, createStore } from 'redux';
import { loadingReducer, messageReducer, themeReducer } from './slices';

//Utils functions such as dialog state, loading state, ....
const staticReducer = {
  loading: loadingReducer,
  message: messageReducer,
  theme: themeReducer,
};

function createReducers(asyncReducers: any) {
  return combineReducers({
    ...staticReducer,
    ...asyncReducers,
  });
}
/* eslint-disable no-underscore-dangle */
const store: any = createStore(
  createReducers({}),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
store.asyncReducers = {};

const injectReducer = (key: string, reducer: any) => {
  if (store.asyncReducers[key]) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducers(store.asyncReducers));
};

export { store, injectReducer };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
