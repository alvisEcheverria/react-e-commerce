import { createSlice } from '@reduxjs/toolkit';

export const filteredCategorySlice = createSlice({
    name: 'filteredCategory',
    initialState: [],
    reducers: {
        setFilteredCategory: (state, action) =>{
            return action.payload
        }
    }
})

export const { setFilteredCategory } = filteredCategorySlice.actions;

export default filteredCategorySlice.reducer;
