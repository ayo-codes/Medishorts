import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import User from "./users/pages/User";
import Products from "./products/pages/Products";
import ProductRequests from "./productRequests/pages/ProductRequests";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserProductRequests from "./productRequests/pages/UserProductRequests";
import ProductRequestCreate from "./productRequests/pages/ProductRequestCreate";
import ProductRequestUpdate from "./productRequests/pages/ProductRequestUpdate";
import Auth from "./users/pages/Auth";

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
            <Route path="/auth" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-requests" element={<ProductRequests />}  />
            <Route path="/product-requests/new" element={<ProductRequestCreate />} />
            <Route path="/product-requests/:productRequestId" element={<ProductRequestUpdate />} />
            <Route path="/:userId/product-requests" element={<UserProductRequests />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
