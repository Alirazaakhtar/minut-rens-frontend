import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import CreateBooking from './pages/CreateBooking';
import PrivateRoute from './components/middleware/PrivateRoute';
import Navbar from './components/Navbar';
import AdminRoute from './components/middleware/AdminRoute';
import AdminPage from './pages/admin/AllBookings';
import Services from './pages/Services';
import Register from './pages/Register';
import EditBooking from './pages/admin/EditBooking';
import Users from './pages/admin/Users';
import CreateSerice from './pages/admin/CreateService';
import AllServices from './pages/admin/AllServices';
import EditService from './pages/admin/EditService';
import Copyright from './components/Copyright';
import ThankYou from './pages/ThankYou';
import BookingThankYou from './pages/BookingThankYou';
import EditUser from './pages/admin/EditUser';
import ContactPage from './pages/Contact';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tak" element={<ThankYou />} />
        <Route path="/modtaget" element={<BookingThankYou />} />
        <Route path="/kontakt" element={<ContactPage />} />


        
        <Route path="bookings/admin/" element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
          } 
        />
        <Route path="/bookings/edit/:id" element={
          <AdminRoute>
            <EditBooking />
          </AdminRoute>
          } />
        <Route path="/users" element={
          <AdminRoute>
            <Users/>
          </AdminRoute>
          } />
        <Route path="/services/create" element={
          <AdminRoute>
            <CreateSerice/>
          </AdminRoute>
          } />
          <Route path="/services/admin" element={
          <AdminRoute>
            <AllServices/>
          </AdminRoute>
          } />
          <Route path="/services/edit/:id" element={
          <AdminRoute>
            <EditService/>
          </AdminRoute>
          } />
          <Route path="/users/edit/:id" element={
          <AdminRoute>
            <EditUser/>
          </AdminRoute>
          } />


        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          }
        />
        <Route 
          path="/book" 
          element={
            <PrivateRoute>
              <CreateBooking />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Copyright/>
    </Router>
  );
}

export default App;