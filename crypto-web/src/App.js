import './App.css';
import { ThemeProvider } from "@mui/material";
import theme from './utils/theme';
import { RouterProvider } from "react-router-dom";
import router from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
