
import type { RootState } from "../../app/store";
import type { Product } from "./productSlice";


export const selectProducts = (state: RootState): Product[] => state.products.products;
export const selectProductsLoading = (state: RootState): boolean => state.products.loading;
export const selectProductsError = (state: RootState): string | null => state.products.error;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const selectSelectedLoading = (state: RootState) => state.products.selectedLoading;
export const selectSelectedError = (state: RootState) => state.products.selectedError;