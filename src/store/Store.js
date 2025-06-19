import { configureStore, createSlice } from '@reduxjs/toolkit';


const languageSlice = createSlice({
    name: 'language',
    initialState: { language: 'ru' },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
});

export const { setLanguage } = languageSlice.actions;


const store = configureStore({
    reducer: {
        language: languageSlice.reducer,
    },
});

export default store;

