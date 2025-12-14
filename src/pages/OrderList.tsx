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
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import type { AppDispatch } from "../app/store";
import { fetchOrders } from "../features/orders/orderSlice";
import {
  selectOrdersByStatus,
  selectOrdersLoading,
} from "../features/orders/orderSelectors";
import type { OrderStatus } from "../features/orders/orderTypes";
import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderDetailsDialog from "../components/OrderDetailsDialog";

const OrderList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const orders = useSelector(selectOrdersByStatus(statusFilter));
  const loading = useSelector(selectOrdersLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const sortedOrders = [...orders].sort((a, b) =>
    sortAsc ? a.total - b.total : b.total - a.total
  );

  return (

    <>


      <Typography 
        variant="h5" 
        gutterBottom
        fontWeight={500}
      >
        Order Management
      </Typography>

      <Typography
        mb={0.25}
        fontWeight={500}
      >
        Keep track of all orders,
      </Typography>

      <Typography
        variant="body2"
        mb={6}
      >
        View, update, and manage customer orders efficiently to ensure smooth operations.
      </Typography>



      <Stack spacing={2}>

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
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setDialogOpen(true);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {!loading && sortedOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <OrderDetailsDialog
          open={dialogOpen}
          orderId={selectedOrderId}
          onClose={() => setDialogOpen(false)}
        />
      </Stack>
    </>
  );
};

export default OrderList;
