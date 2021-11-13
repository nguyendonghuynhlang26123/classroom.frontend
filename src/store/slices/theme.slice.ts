import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ThemeState {
  theme: string;
}

// Define the initial state using that type
const initialState: ThemeState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      const theme = action.payload.theme;
      localStorage.setItem('theme', theme);
      return {
        theme: theme,
      };
    },
    getTheme: (state) => ({
      theme: localStorage.getItem('theme') || 'light',
    }),
  },
});

export const { setTheme, getTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
