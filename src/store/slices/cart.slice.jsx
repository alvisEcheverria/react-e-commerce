import { createSlice } from '@reduxjs/toolkit';
import { setIsloading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';
import axios from 'axios';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const getCartThunk = () => dispatch => {
    dispatch(setIsloading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig() )
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsloading(false)));
}

export const postProdCartThunk = (addData) => dispatch => {
    dispatch(setIsloading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', addData, getConfig())
        .then(()=> dispatch(getCartThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsloading(false)));
}

export const purshaseCartThunk = () => dispatch => {
    dispatch(setIsloading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsloading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
