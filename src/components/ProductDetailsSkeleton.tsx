
import { Box, Skeleton, Stack } from "@mui/material";

const ProductDetailsSkeleton = () => {
  return (
    <Box>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        {/* Image */}
        <Skeleton
          variant="rounded"
          width={300}
          height={300}
        />

        {/* Info */}
        <Stack spacing={2} flex={1}>
          <Skeleton variant="text" height={40} width="70%" />
          <Skeleton variant="text" height={24} width="50%" />
          <Skeleton variant="text" height={80} />
          <Skeleton variant="text" height={24} width="30%" />

          <Stack direction="row" spacing={2}>
            <Skeleton variant="rounded" width={120} height={40} />
            <Skeleton variant="rounded" width={120} height={40} />
          </Stack>

          <Skeleton variant="rounded" height={48} width={180} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductDetailsSkeleton;
