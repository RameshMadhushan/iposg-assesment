// src/features/products/productSelectors.ts

import type { RootState } from "../../app/store";
import type { Product } from "./productSlice";


export const selectProducts = (state: RootState): Product[] => state.products.products;
export const selectProductsLoading = (state: RootState): boolean => state.products.loading;
export const selectProductsError = (state: RootState): string | null => state.products.error;
