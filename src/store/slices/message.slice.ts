import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface MessageState {
  message: string;
  type: 'warning' | 'info' | 'error' | 'success';
}

// Define the initial state using that type
const initialState: MessageState = {
  message: '',
  type: 'success',
};

export const messageSlice = createSlice({
  name: 'message',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    showMessage: (state, action: PayloadAction<MessageState>) => ({
      ...initialState,
      ...action.payload,
    }),
    showSuccessMessage: (state, action: PayloadAction<string>) => ({
      message: action.payload,
      type: 'success',
    }),
    hideMessage: (state) => initialState,
  },
});

export const { showMessage, hideMessage, showSuccessMessage } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
