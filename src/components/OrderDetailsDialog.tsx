import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Divider,
  Skeleton,
  Avatar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

interface Props {
  open: boolean;
  orderId: number | null;
  onClose: () => void;
}

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountedTotal: number;
  thumbnail: string;
}

interface CartDetails {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

const OrderDetailsDialog = ({ open, orderId, onClose }: Props) => {
    const [data, setData] = useState<CartDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open || !orderId) return;

        const controller = new AbortController();

        const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            setData(null);

            const res = await axiosInstance.get<CartDetails>(
            `/carts/${orderId}`,
            { signal: controller.signal }
            );

            setData(res.data);
        } catch (err: any) {
            if (err.name !== "CanceledError") {
            console.error(err);
            setError("Failed to load order details.\nPlease try again.");
            }
        } finally {
            setLoading(false);
        }
        };

        fetchOrderDetails();

        return () => controller.abort();
    }, [open, orderId]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Order Details</DialogTitle>

        <DialogContent dividers>
            {/* Loading Skeleton */}
            {loading && (
            <Stack spacing={2}>
                {[1, 2, 3].map((i) => (
                <Stack key={i} direction="row" spacing={2}>
                    <Skeleton variant="rounded" width={64} height={64} />
                    <Stack flex={1}>
                    <Skeleton width="70%" />
                    <Skeleton width="40%" />
                    </Stack>
                    <Skeleton width={80} />
                </Stack>
                ))}
            </Stack>
            )}

            {/* Error State */}
            {!loading && error && (
            <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
                {error}
            </Alert>
            )}

            {/* Data */}
            {!loading && data && (
            <Stack spacing={2}>
                {data.products.map((p) => (
                <Stack
                    key={p.id}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Avatar
                    src={p.thumbnail}
                    variant="rounded"
                    sx={{ width: 64, height: 64 }}
                    />

                    <Stack flex={1}>
                    <Typography fontWeight={600}>{p.title}</Typography>
                    <Typography variant="body2">
                        Qty: {p.quantity} × ${p.price}
                    </Typography>
                    </Stack>

                    <Stack textAlign="right">
                    <Typography>${p.total.toFixed(2)}</Typography>
                    <Typography variant="caption" color="success.main">
                        After discount: ${p.discountedTotal.toFixed(2)}
                    </Typography>
                    </Stack>
                </Stack>
                ))}

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                <Typography>Total Items</Typography>
                <Typography>{data.totalQuantity}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                <Typography>Total Products</Typography>
                <Typography>{data.totalProducts}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={600}>Grand Total</Typography>
                <Typography fontWeight={600}>
                    ${data.discountedTotal.toFixed(2)}
                </Typography>
                </Stack>
            </Stack>
            )}

            {/* Empty State */}
            {!loading && !data && !error && (
            <Typography color="text.secondary" align="center">
                No order data available
            </Typography>
            )}
        </DialogContent>

        <DialogActions>
            <Button onClick={onClose} variant="outlined">
            Close
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default OrderDetailsDialog;
