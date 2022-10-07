import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cart.slice'
import filteredCategorySlice  from './slices/filteredCategory.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice  from './slices/products.slice'
import purshaseSlice from './slices/purshase.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products:  productsSlice,
        purshases: purshaseSlice,
        filteredCategory: filteredCategorySlice,
        cart: cartSlice
    }
})
