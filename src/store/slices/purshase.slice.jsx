import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsloading } from './isLoading.slice';

export const purshaseSlice = createSlice({
    name: 'purshase',
    initialState: [],
    reducers: {
        setPurshases: (state, action)=>{
            return action.payload;
        }
    }
})

export const getPurshasesThunk = () => (dispatch) => {
    dispatch(setIsloading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
        .then(res => dispatch(setPurshases(res.data.data.purchases)))
        .finally(() => dispatch(setIsloading(false)));
}

export const { setPurshases } = purshaseSlice.actions;

export default purshaseSlice.reducer;
