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
    page: "1",
    pageSize: "10",
    sort: "popular",
    order: "desc",
  });

  const handleParamChange = (paramName: string) => (event: any) => {
    setSearchParams((prev) => {
      prev.set(paramName, event.target.value);
      return prev;
    });
    setSearchParams((prev) => {
      prev.set("page", "1");
      return prev;
    });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  const { data, isLoading, isError } = queryTags({
    pageSize: searchParams.get("pageSize") || undefined,
    page: searchParams.get("page") || undefined,
    order: searchParams.get("order") || undefined,
    sort: searchParams.get("sort") || undefined,
    site: "stackoverflow",
  });

  const getQueryParam = (paramName: string) => searchParams.get(paramName);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        justifyContent: "space-evenly",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Stack Overflow Tags Browser
      </Typography>
      <Box display="flex" gap={5}>
        <FormControl sx={{ minWidth: "100px" }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            sx={{ width: "150px", textAlign: "left" }}
            labelId="sort-label"
            label="Sort By"
            id="sort"
            value={getQueryParam("sort")}
            onChange={handleParamChange("sort")}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="activity">Activity</MenuItem>
            <MenuItem value="popular">Popularity</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: "100px" }}>
          <InputLabel id="order-label">Order</InputLabel>
          <Select
            sx={{ width: "150px", textAlign: "left" }}
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
        <TablePagination
          slotProps={{
            actions: {
              previousButton: {
                disabled: getQueryParam("page") === "1",
              },
              nextButton: {
                disabled: data?.has_more === false,
              },
            },
          }}
          component="div"
          count={data ? data.quota_max : 0}
          page={parseInt(getQueryParam("page") || "0")}
          rowsPerPage={parseInt(getQueryParam("pageSize") || "10")}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleParamChange("pageSize")}
        />
      </Box>
      <TagTable
        loading={isLoading}
        isError={isError}
        tags={data?.items || []}
      />
    </Container>
  );
};
