import { createSlice, createAsyncThunk, type PayloadAction,  } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import type { Order, OrderStatus } from "./orderTypes";

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const getRandomStatus = (): OrderStatus => {
  const statuses: OrderStatus[] = [
    "Pending",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const response = await axiosInstance.get("/carts");

    const orders: Order[] = response.data.carts.map((cart:any) => ({
      id: cart.id,
      userId: cart.userId,
      total: cart.total,
      discountedTotal: cart.discountedTotal,
      totalProducts: cart.totalProducts,
      totalQuantity: cart.totalQuantity,
      status: getRandomStatus(),
    }));

    return orders;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      });
  },
});

export default orderSlice.reducer;
