import {
  CircularProgress,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  Table,
  TableRow,
  TableBody,
  Paper,
  Box,
} from "@mui/material";
import { TagItem } from "../../api/api";

interface TagTableProps {
  loading: boolean;
  isError: boolean;
  tags: TagItem[];
}

interface Props {
  loading: boolean;
  isError: boolean;
}

const Fallback = ({ loading, isError }: Props) => {
  if (loading) {
    return (
      <Box
        sx={{
          height: "500px",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box
        sx={{
          height: "500px",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body1" color="error">
          Error fetching data
        </Typography>
      </Box>
    );
  }
};

export const TagTable = ({ loading, isError, tags }: TagTableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ height: "500px", maxHeight: "500px", width: "800px" }}
    >
      {loading || isError ? (
        <Fallback loading={loading} isError={isError} />
      ) : (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">Tag</TableCell>
              <TableCell align="center">Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag) => (
              <TableRow
                key={tag.name}
                sx={(theme) => ({
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  textAlign: "center",
                })}
              >
                <TableCell align="left">{tag.name}</TableCell>
                <TableCell align="center">{tag.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
