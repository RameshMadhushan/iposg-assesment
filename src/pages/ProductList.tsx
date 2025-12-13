// src/pages/ProductList.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";

import { Stack, TextField, MenuItem, Typography, Slider, Button } from "@mui/material";
import type { AppDispatch, RootState } from "../app/store";
import { DataGrid, type GridPaginationModel } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { selectProductsError, selectProductsLoading } from "../features/products/productSelectors";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });

  const products = useSelector((state: RootState) => state.products.products);
  const total = useSelector((state: RootState) => state.products.total);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  /* const categories = useSelector((state: RootState) => [...new Set(state.products.products.map(p => p.category))]); */

  const fetchData = () => {
    dispatch(fetchProducts({
      search,
      category,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
    }));
  };

  useEffect(() => { fetchData(); }, [search, category, priceRange, paginationModel.page, paginationModel.pageSize]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "sku", headerName: "SKU", flex: 1 },
    { field: "title", headerName: "Name", flex: 2 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "price", headerName: "Price ($)", type: "number", flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", flex: 1 },
    { field: "rating", headerName: "Rating", type: "number", flex: 1 },
    { field: "discountPercentage", headerName: "Discount (%)", flex: 1 },
  ];

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Products</Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap">
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} size="small"/>

        {/* <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} size="small" sx={{ minWidth: 150 }}>
          <MenuItem value="">All</MenuItem>
          {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField> */}

        <Stack spacing={1} sx={{ width: 200 }}>
          <Typography variant="caption">Price: ${priceRange[0]} - ${priceRange[1]}</Typography>
          <Slider value={priceRange} onChange={(_, v) => setPriceRange(v as [number, number])} valueLabelDisplay="auto" min={0} max={1000}/>
        </Stack>
        <Button variant="contained" onClick={fetchData}>Filter</Button>
      </Stack>

      <div style={{  width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSizeOptions={[10,20,50]}
          rowCount={total}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
          disableColumnMenu
          disableColumnResize
          getRowId={(row)=>row.id}
        />
      </div>

      {error && <Typography color="error">{error}</Typography>}
    </Stack>
  );
};

export default ProductList;
