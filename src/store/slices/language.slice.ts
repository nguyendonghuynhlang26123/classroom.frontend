import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface LanguageState {
  language: string;
}

// Define the initial state using that type
const initialState: LanguageState = {
  language: 'en',
};

export const languageSlice = createSlice({
  name: 'navbar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getLanguage: (state) => ({
      language: localStorage.getItem('language') || 'en',
    }),
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLanguage: (state, action: PayloadAction<string>) => {
      localStorage.setItem('language', action.payload);
      return { language: action.payload };
    },
  },
});

export const { setLanguage, getLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
