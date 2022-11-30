import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/layout.component';
import Sidebar from './components/sidebar/sidebar.component';
import ForgotPassword from './pages/auth/forgot-password/forgot-password.component';
import Login from './pages/auth/login/login.component';
import Register from './pages/auth/register/register.component';
import ResetPassword from './pages/auth/reset-password/reset-password.comonent';
import Dashboard from './pages/dashboard/dashboard.component';
import Home from './pages/home/home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/dashboard' element={<Dashboard />} /> */}
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/resetpassword/:resetToken' element={<ResetPassword />} />
        <Route
          path='/dashboard'
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path='/add-product'
          element={
            <Sidebar>
              <Layout>{/* <AddProduct /> */}</Layout>
            </Sidebar>
          }
        />
        <Route
          path='/product-detail/:id'
          element={
            <Sidebar>
              <Layout>{/* <ProductDetail /> */}</Layout>
            </Sidebar>
          }
        />
        <Route
          path='/edit-product/:id'
          element={
            <Sidebar>
              <Layout>{/* <EditProduct /> */}</Layout>
            </Sidebar>
          }
        />
        <Route
          path='/profile'
          element={
            <Sidebar>
              <Layout>{/* <Profile /> */}</Layout>
            </Sidebar>
          }
        />
        <Route
          path='/edit-profile'
          element={
            <Sidebar>
              <Layout>{/* <EditProfile /> */}</Layout>
            </Sidebar>
          }
        />
        <Route
          path='/contact-us'
          element={
            <Sidebar>
              <Layout>{/* <Contact /> */}</Layout>
            </Sidebar>
          }
        />
      </Routes>
    </>
  );
}

export default App;
