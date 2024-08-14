import { BrowserRouter, Route , Routes , Navigate } from 'react-router-dom'
import User from './users/pages/users'

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<User/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </>
  
}

export default App
