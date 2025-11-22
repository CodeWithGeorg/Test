import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import PlaceOrder from "./routes/PlaceOrder";
import ClientDashboard from "./routes/ClientDashboard";
import AdminDashboard from "./routes/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";

export default function App(){
  return (
    <div>
      <nav style={{padding:12, borderBottom:"1px solid #eee"}}>
        <Link to="/" style={{marginRight:10}}>Home</Link>
        <Link to="/place-order" style={{marginRight:10}}>Place Order</Link>
        <Link to="/dashboard" style={{marginRight:10}}>Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/place-order" element={<PlaceOrder/>} />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <ClientDashboard/>
          </PrivateRoute>
        } />

        <Route path="/admin" element={
          <PrivateRoute adminOnly>
            <AdminDashboard/>
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}
