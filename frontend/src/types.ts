// src/types.ts

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  _id: string;
  products: Product[];
  subtotal: number;
  gst: number;
  totalAmount: number;
  invoiceNumber: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
}
