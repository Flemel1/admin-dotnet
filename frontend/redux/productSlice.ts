import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DataTableProduct, Product, ProductState } from '../utils/type';

const initialState: ProductState = {
    products: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        loadProducts: (state, action: PayloadAction<DataTableProduct>) => {
            state.products = action.payload.products
        },
        insertProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload)
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const index = state.products.findIndex((product) => product.id == action.payload)
            state.products.splice(index, 1)
        }
    }
})

export const { loadProducts, insertProduct, deleteProduct } = productSlice.actions

export default productSlice.reducer