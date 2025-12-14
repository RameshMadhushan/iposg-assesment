import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Typography,
  Select,
  MenuItem,
  TableSortLabel,
} from "@mui/material";

import type { AppDispatch } from "../app/store";
import {
  fetchOrders,
} from "../features/orders/orderSlice";
import {
  selectOrdersByStatus,
  selectOrdersLoading,
} from "../features/orders/orderSelectors";
import type { OrderStatus } from "../features/orders/orderTypes";
import OrderStatusBadge from "../components/OrderStatusBadge";

const OrderList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [sortAsc, setSortAsc] = useState(true);

  const orders = useSelector(selectOrdersByStatus(statusFilter));
  const loading = useSelector(selectOrdersLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const sortedOrders = [...orders].sort((a, b) =>
    sortAsc ? a.total - b.total : b.total - a.total
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Orders</Typography>

      <Select
        value={statusFilter}
        size="small"
        onChange={(e) => setStatusFilter(e.target.value as any)}
        sx={{ width: 200 }}
      >
        <MenuItem value="ALL">All</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Shipped">Shipped</MenuItem>
        <MenuItem value="Delivered">Delivered</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
      </Select>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>
              <TableSortLabel
                active
                direction={sortAsc ? "asc" : "desc"}
                onClick={() => setSortAsc(!sortAsc)}
              >
                Total
              </TableSortLabel>
            </TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
            </TableRow>
          ))}

          {!loading && sortedOrders.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default OrderList;
