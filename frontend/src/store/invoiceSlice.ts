import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface InvoiceState {
  products: Product[];
  currentInvoiceId: string | null;
}

const initialState: InvoiceState = {
  products: [],
  currentInvoiceId: null,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products.splice(action.payload, 1);
    },
    clearProducts: (state) => {
      state.products = [];
    },
    setCurrentInvoiceId: (state, action: PayloadAction<string>) => {
      state.currentInvoiceId = action.payload;
    },
  },
});

export const { addProduct, removeProduct, clearProducts, setCurrentInvoiceId } = invoiceSlice.actions;
export default invoiceSlice.reducer;