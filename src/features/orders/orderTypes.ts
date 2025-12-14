export type OrderStatus =
  | "Pending"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface Order {
  id: number;
  userId: number;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  status: OrderStatus;
}
