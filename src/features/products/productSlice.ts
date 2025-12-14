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
  total: number; 
  loading: boolean;
  error: string | null;
  categories: string[];
}

const initialState: ProductState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
  categories: [],
};

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

    query.limit = limit;
    query.skip = skip;
    
    if (params.search) {
      url = `/products/search`;
      query.q = params.search;
    }    
    else if (params.category) {
      url = `/products/category/${params.category}`;
    }    
    else {
      url = `/products`;
    }
    
    if (!params.search) {
      if (params.minPrice !== undefined) query.price_gte = params.minPrice;
      if (params.maxPrice !== undefined) query.price_lte = params.maxPrice;
    }

    const queryString = new URLSearchParams(
      query as Record<string, string>
    ).toString();

    const response = await axiosInstance.get(
      queryString ? `${url}?${queryString}` : url
    );

    return {
      products: response.data.products,
      total: response.data.total,
    };
  }
);



export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axiosInstance.get<string[]>("/products/category-list");
    return response.data;
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
      })    
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default productSlice.reducer;
