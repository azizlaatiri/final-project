import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/bookingcar/:carid' element={<BookingCar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoutes(props) {
  if (localStorage.getItem('user')) {
    return <Route {...props} />;
  } else {
    return <Navigate to='/login' />;
  }
}
