// src/features/products/productSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction,  } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface ProductState {
  products: Product[];
  total: number; // total products for pagination
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
};

// Async thunk with query params for server-side filtering
interface FetchProductsParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: FetchProductsParams) => {
    const query = new URLSearchParams();

    if (params.search) query.append("q", params.search); // depends on your API
    if (params.category) query.append("category", params.category);
    if (params.minPrice !== undefined) query.append("price_gte", params.minPrice.toString());
    if (params.maxPrice !== undefined) query.append("price_lte", params.maxPrice.toString());
    if (params.page !== undefined) query.append("skip", (params.page * (params.limit || 10)).toString());
    if (params.limit !== undefined) query.append("limit", params.limit.toString());

    const response = await axiosInstance.get(`/products?${query.toString()}`);

    return { products: response.data.products, total: response.data.total };
  }
);




const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{products: Product[], total: number}>) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
