import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TableView } from "./view/TableView";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const dark = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={dark}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TableView />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
