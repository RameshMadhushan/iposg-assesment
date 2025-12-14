
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export interface Product {
  id: string;
  title: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  rating?: number;
  availabilityStatus?: string;
  images?: string[];
}

interface ProductState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  categories: string[];
  selectedProduct: Product | null;
  selectedLoading: boolean;
  selectedError: string | null;
}

const initialState: ProductState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
  categories: [],
  selectedProduct: null,
  selectedLoading: false,
  selectedError: null,
};

interface FetchProductsParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

// Fetch product list
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
    } else if (params.category) {
      url = `/products/category/${params.category}`;
    } else {
      url = `/products`;
    }

    if (!params.search) {
      if (params.minPrice !== undefined) query.price_gte = params.minPrice;
      if (params.maxPrice !== undefined) query.price_lte = params.maxPrice;
    }

    const queryString = new URLSearchParams(query as Record<string, string>).toString();
    const response = await axiosInstance.get(queryString ? `${url}?${queryString}` : url);

    return {
      products: response.data.products,
      total: response.data.total,
    };
  }
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axiosInstance.get<string[]>("/products/category-list");
    return response.data;
  }
);

// Fetch single product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product) => {
    const response = await axiosInstance.post(`/products/add`, product, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ---- Products list ----
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ products: Product[]; total: number }>) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });

    // ---- Categories ----
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    });

    // ---- Single product ----
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.error.message || "Failed to fetch product";
      });

    // ---- Update product ----
    builder
      .addCase(updateProduct.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedLoading = false;
        state.selectedProduct = action.payload;

        // Update in products list
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.error.message || "Failed to update product";
      });
  },
});

export default productSlice.reducer;
