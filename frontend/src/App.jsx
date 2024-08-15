import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import User from "./users/pages/users";
import Products from "./products/pages/products";
import ProductRequests from "./productRequests/pages/productRequests";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <MainNavigation />
          <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-requests" element={<ProductRequests />}  />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
