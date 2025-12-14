import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { OrderStatus } from "./orderTypes";

export const selectOrdersState = (state: RootState) => state.orders;

export const selectAllOrders = createSelector(
  selectOrdersState,
  (ordersState) => ordersState.orders
);

export const selectOrdersLoading = createSelector(
  selectOrdersState,
  (ordersState) => ordersState.loading
);

export const selectOrdersError = createSelector(
  selectOrdersState,
  (ordersState) => ordersState.error
);

// 🔹 Derived selector: filter by status
export const selectOrdersByStatus = (status: OrderStatus | "ALL") =>
  createSelector(selectAllOrders, (orders) =>
    status === "ALL" ? orders : orders.filter((o) => o.status === status)
  );
