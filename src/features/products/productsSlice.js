import { createAsyncThunk, createSlice, current  } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchProductsData = createAsyncThunk(
    'products/fetchProductsData',
    async () => {
        const { data } = await axios.get('https://developertests.z33.web.core.windows.net/ReactTestData.json')
        return data
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: null,
        data: null,
        selectedProducts: [],
    },
    reducers: {
        // actions
        updateSelectedProducts: (state, action) => {
            // action.payload would look like: Milk

            if (current(state).selectedProducts.filter(category => category.title === action.payload).length > 0) {
                // the clicked button is already selected, remove product from state
                state.selectedProducts = state.selectedProducts.filter(category => category.title !== action.payload)
            }
            else {
                // the clicked button is not selected, add product to state
                // finds matching category object from data
                state.selectedProducts.push(current(state).data.find(category => category.title === action.payload))
            }
        },
        clearSelectedProducts: (state) => {
            state.selectedProducts = []
        },
        selectAllSelectedProducts: (state) => {
            state.selectedProducts = [...state.data]
        },
    },
    extraReducers: {
        // actions
        [fetchProductsData.pending](state) {
            state.loading = 'loading'
        },
        [fetchProductsData.fulfilled](state, {payload}) {
            state.loading = 'fullfilled'
            state.data = payload
            state.selectedProducts.push(payload[0]) // show first category in data by default
        },
        [fetchProductsData.rejected](state) {
            state.loading = 'rejected'
        },
    },
})

export const { updateSelectedProducts, clearSelectedProducts, selectAllSelectedProducts } = productsSlice.actions

export default productsSlice.reducer;

// exported selectors:

export const selectLoadingStatus = ({ products }) => products.loading

export const selectSelectedProducts = ({ products }) => products.selectedProducts
