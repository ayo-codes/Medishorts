import { BrowserRouter, Route , Routes , Navigate } from 'react-router-dom'
import UserApp from './users/pages/users'

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserApp/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </>
  
}

export default App
