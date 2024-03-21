import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Feed from './pages/Feed';
import Register from './pages/Register';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
