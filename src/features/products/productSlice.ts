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
    let url = "";
    const query: Record<string, string | number> = {}; 

    const limit = params.limit ?? 10;
    const page = params.page ?? 1;
    const skip = (page - 1) * limit;

    query.skip = skip;
    query.limit = limit;

    if (params.search) {
      url = `/products/search`;
      query.q = params.search;
    } else {
      url = `/products`;
      if (params.category) query.category = params.category;
      if (params.minPrice !== undefined) query.price_gte = params.minPrice;
      if (params.maxPrice !== undefined) query.price_lte = params.maxPrice;
    }

    // Convert query object to query string manually
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const response = await axiosInstance.get(`${url}?${queryString}`);

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
