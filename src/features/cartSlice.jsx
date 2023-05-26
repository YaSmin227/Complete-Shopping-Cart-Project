import { createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-toastify';
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        ItemQuantity: 0,
        carQuantity: localStorage.getItem('carQuantity') ? JSON.parse(localStorage.getItem('carQuantity')) : 0,
        TotalCartPrice: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const ItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (ItemIndex === -1) {
                state.cartItems.push({ ...action.payload, ItemQuantity: 1 })
                toast.success(`${action.payload.name} added to cart`)
            } else {
                state.cartItems[ItemIndex].ItemQuantity += 1;
                toast.info(`increase quantity of ${state.cartItems[ItemIndex].name}`)
            }
            state.carQuantity += 1;
            // add items to local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            // add total to local storage
            localStorage.setItem('carQuantity', JSON.stringify(state.carQuantity))
        },
        // Remove From Cart
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
            toast.error(`${action.payload.name} removed from cart`)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            // add total to local storage
            localStorage.setItem('carQuantity', JSON.stringify(state.carQuantity))
        },
        decreaseCart: (state, action) => {
            const ItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            // test if there is an item 
            if (state.cartItems[ItemIndex].ItemQuantity > 1) {
                state.cartItems[ItemIndex].ItemQuantity -= 1;

                toast.info(`decrease quantity of ${state.cartItems[ItemIndex].name}`)
                if (state.carQuantity !== 0) {
                    state.carQuantity -= 1;
                }
            }
            else if (state.cartItems[ItemIndex].ItemQuantity === 1) {
                console.log('reached');
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
                toast.error(`${action.payload.name} removed from cart`);

                if (state.carQuantity !== 0) {
                    state.carQuantity -= 1;
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            // add total to local storage
            localStorage.setItem('carQuantity', JSON.stringify(state.carQuantity))
        },
        clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            // add total to local storage
            localStorage.setItem('carQuantity', JSON.stringify(state.carQuantity))
            toast.error("Cart Items are  cleared ", { position: "bottom-left" });
        },
        getTotalPrice(state, action) {
            state.TotalCartPrice = state.cartItems.reduce((total, item) => total + (item.price * item.ItemQuantity), 0)
        }
    }
});
export default cartSlice.reducer;
export const { addToCart, decreaseCart, removeFromCart, clearCart, getTotalPrice } = cartSlice.actions;
