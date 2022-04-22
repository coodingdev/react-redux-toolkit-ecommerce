import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from 'react-toastify';

const url = 'https://fakestoreapi.com/products'
const initialState = {
  cartItems: [],
  addedItems: [],
  isLoading: true,
  error: null,
  modalIsOpening: false,
  total: 0,
};

export const getCart = createAsyncThunk('cart/getCart', async(_, thunkAPI) => {
    try {
        const resp = await axios.get(url)
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.resp)
    }
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalIsOpening = !state.modalIsOpening;
    },

    //handle modal close
    closeModal: (state) => {
      state.modalIsOpening = false;
    },
       addItemToCart: (state, action) => {
      const { id, title, price, image } = action.payload;
      const new_items = { id, title, price, image};
      const dd = state.addedItems;
      if (dd === null) {
        localStorage.setItem(
          "cart",
          JSON.stringify({ ...new_items, quantity: 1 })
        );
        state.addedItems = [...state.addedItems, new_items];
      } else {
        const index = dd.findIndex((item) => item.id === id);
        if (index === -1) {
          dd.push({ ...new_items, quantity: 1 });
          toast.success("Item added to cart");
        } else {
          dd[index].quantity += 1;
        }
        localStorage.setItem("cart", JSON.stringify(dd));
      }
    },
    removeItemFromCart: (state, action) => {
      const  {id, title}  = action.payload;
      const new_items = localStorage.getItem('cart');
      const new_items_array = JSON.parse(new_items);
      const new_items_array_filtered = new_items_array.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(new_items_array_filtered));
      state.addedItems = new_items_array_filtered;
      toast.success(`${title} removed from cart`);
    },
    // increase item quantity
     increaseQuantity: (state, action) => {
      const id = action.payload
      const new_items = localStorage.getItem('cart');
      const new_items_array = JSON.parse(new_items);
      const itemForQuantityToBeIncrease = new_items_array.find(
        item => item.id === id
      );
      itemForQuantityToBeIncrease.quantity += 1;
      itemForQuantityToBeIncrease.price = itemForQuantityToBeIncrease.price * itemForQuantityToBeIncrease.quantity;
      localStorage.setItem('cart', JSON.stringify(new_items_array));
      state.addedItems = new_items_array;
    },
    // reduce item quantity
    decreaseQuantity: (state, action) => {
     const id = action.payload
      const new_items = localStorage.getItem('cart');
      const new_items_array = JSON.parse(new_items);
      const itemForQuantityToBeDecrease = new_items_array.find(
        item => item.id === id
      );
      // if quantity is 1, remove item from cart and localStorage decrease quantity and price
      if (itemForQuantityToBeDecrease.quantity === 1) {
        const new_items_array_filtered = new_items_array.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(new_items_array_filtered));
        state.addedItems = new_items_array_filtered;
      } else {
        itemForQuantityToBeDecrease.quantity -= 1;
        itemForQuantityToBeDecrease.price = itemForQuantityToBeDecrease.price / itemForQuantityToBeDecrease.quantity;
        localStorage.setItem('cart', JSON.stringify(new_items_array));
        state.addedItems = new_items_array;
      }
      
    },
    calculateTotal: (state) => {
      // calculate total if cart is not empty or null or item less than 1
      if (state.addedItems.length > 0) {
        const total = state.addedItems.reduce((acc, item) => {
          return acc + item.price;
        }
        , 0);
        state.total = total;
      } else {
        state.total = 0;
      }
    },
  },
  extraReducers: {
      [getCart.pending]: (state) => {
          state.isLoading = true
      },
      [getCart.fulfilled]: (state, action) => {
          state.isLoading = false
          state.cartItems = action.payload
      },
      [getCart.rejected]: (state) => {
          state.isLoading = false;
      }
  }
});
export const {
  toggleModal,
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
  closeModal,
  calculateTotal,
  addItemToCart,
} = cartSlice.actions;
export default cartSlice.reducer