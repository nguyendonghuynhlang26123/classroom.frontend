import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface LoadingState {
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: LoadingState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    showLoading: (state) => ({
      isLoading: true,
    }),
    hideLoading: (state) => ({
      isLoading: false,
    }),
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
