import { BrowserRouter, Route , Routes , Navigate } from "react-router-dom"
import User from "./users/pages/users"
import Products from "./products/pages/products"
import ProductRequests from "./productRequests/pages/productRequests"

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<User/>} />
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/product" element={<Products/>} />
        <Route path="/product-request" element={<ProductRequests/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </>
  
}

export default App
