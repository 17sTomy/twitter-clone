import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import Feed from './pages/Feed';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout/>}>
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Feed/>} />
            <Route path="/:username" element={<UserProfile/>} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
