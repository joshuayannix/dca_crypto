import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartRedux: []
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartRedux = [...state.cartRedux, action.payload.item];
    },
    removeFromCart: (state, action) => {
      let newCart = [...state.cartRedux];

      const index = state.cartRedux.findIndex((cartItem) => cartItem.uuid === action.payload.id);

      if(index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(`Can't remove product id: ${action.payload.id}`)
      };

      state.cartRedux = newCart;

    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartRedux = state => state.cart.cartRedux;

export default cartSlice.reducer;