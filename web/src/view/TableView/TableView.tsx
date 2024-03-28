import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  Typography,
} from "@mui/material";
import { TagTable } from "../../component/Table/TagTable";
import { queryTags } from "../../api/api";
import { useSearchParams } from "react-router-dom";

export const TableView = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    pageSize: "10",
    sort: "name",
    order: "desc",
    site: "stackoverflow",
    page: "1",
  });

  const handleParamChange = (paramName: string) => (event: any) => {
    setSearchParams((prev) => {
      prev.set(paramName, event.target.value);
      return prev;
    });
  };

  const { data, isLoading, isError } = queryTags({
    pageSize: searchParams.get("pageSize") || undefined,
    page: searchParams.get("page") || undefined,
    order: searchParams.get("order") || undefined,
    sort: searchParams.get("sort") || undefined,
  });

  const getQueryParam = (paramName: string) => searchParams.get(paramName);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <Typography variant="h3" gutterBottom>
        Stack Overflow Tags Browser
      </Typography>
      <Box display="flex" gap={5}>
        <FormControl sx={{ minWidth: "100px" }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort By"
            id="sort"
            value={getQueryParam("sort")}
            onChange={handleParamChange("sort")}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="count">Count</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: "100px" }}>
          <InputLabel id="order-label">Order</InputLabel>
          <Select
            labelId="order-label"
            label="Order"
            id="order"
            value={getQueryParam("order")}
            onChange={handleParamChange("order")}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TagTable
        loading={isLoading}
        isError={isError}
        tags={data?.items || []}
      />
      <TablePagination
        component="div"
        count={data ? data.items.length : 0}
        page={parseInt(getQueryParam("page") || "1") - 1}
        rowsPerPage={parseInt(getQueryParam("pageSize") || "10")}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={handleParamChange("page")}
        onRowsPerPageChange={handleParamChange("pageSize")}
      />
    </Container>
  );
};
