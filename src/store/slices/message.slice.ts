import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface MessageState {
  message: string;
}

// Define the initial state using that type
const initialState: MessageState = {
  message: '',
};

export const messageSlice = createSlice({
  name: 'message',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    showMessage: (state, action: PayloadAction<MessageState>) => ({
      ...action.payload,
    }),
    hideMessage: (state) => ({ message: '' }),
  },
});

export const { showMessage, hideMessage } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
