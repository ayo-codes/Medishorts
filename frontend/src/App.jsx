import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import User from "./users/pages/User";
import Products from "./products/pages/Products";
import ProductRequests from "./productRequests/pages/ProductRequests";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserProductRequests from "./productRequests/pages/UserProductRequests";
import ProductRequestCreate from "./productRequests/pages/ProductRequestCreate";
import ProductRequestUpdate from "./productRequests/pages/ProductRequestUpdate";
import ProductRequestsTable from "./productRequests/pages/ProductRequestsTable";
import ShortProductsTable from "./shortProducts/pages/ShortProductsTable";
import ShortProductsHpraTable from "./scrappedShortProductsHpra/pages/ShortProductsHpraTable";
import HomePage from "./homePage/pages/HomePage";
import Auth from "./users/pages/Auth";

import AuthContextProvider from "./shared/context/AuthContext";

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
          <AuthContextProvider>
            <MainNavigation />
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product-requests" element={<ProductRequests />} />
              <Route
                path="/product-requests/new"
                element={<ProductRequestCreate />}
              />
              <Route
                path="/product-requests/:productRequestId"
                element={<ProductRequestUpdate />}
              />
              <Route
                path="/:userId/product-requests"
                element={<UserProductRequests />}
              />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/shorts-hpra" element={<ShortProductsHpraTable />} />
              <Route path="/shorts" element={<ShortProductsTable />} />
              <Route
                path="/product-requests-table"
                element={<ProductRequestsTable />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
