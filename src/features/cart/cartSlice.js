import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
}

//Fetch
/*
export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
    return fetch(url)
        .then(resp => resp.json())
        .catch((err) => console.log(err))
})
*/

//Axios
export const getCartItems = createAsyncThunk('cart/getCartItems',
    async (randomParam, thunkAPI) => {
        try {
            //console.log(randomParam);
            //console.log(thunkAPI);
            //console.log(thunkAPI.getState());
            //thunkAPI.dispatch(openModal());

            const resp = await axios(url)
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectedWithValue('something went wrong')
        }
    }
)


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems =  [];
        },
        removeItem: (state, {payload}) => {
            const itemId = payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        updateAmount: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + payload.amount;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });

            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: {
        [getCartItems.pending]:(state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]:(state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]:(state, action) => {
            console.log(action);
            state.isLoading = false;
        },
    }
})

export const { clearCart, removeItem, increase, decrease, updateAmount, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;