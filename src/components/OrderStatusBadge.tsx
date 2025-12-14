import { Chip } from "@mui/material";
import type { OrderStatus } from "../features/orders/orderTypes";

const colorMap: Record<OrderStatus, "default" | "success" | "warning" | "error" | "info"> = {
    Pending: "warning",
    Shipped: "info",
    Delivered: "success",
    Cancelled: "error",
};

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
    return <Chip label={status} color={colorMap[status]} size="small" />;
};

export default OrderStatusBadge;
