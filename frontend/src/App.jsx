import { BrowserRouter, Route , Routes , Navigate } from "react-router-dom"
import User from "./users/pages/users"
import Products from "./products/pages/products"
import ProductRequests from "./productRequests/pages/productRequests"
import { createTheme, ThemeProvider } from "@mui/material"

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
        <Routes>
          <Route path="/user" element={<User/>} />
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/product" element={<Products/>} />
          <Route path="/product-request" element={<ProductRequests/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </>

  )

  
}

export default App
