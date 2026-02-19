import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import PlaceOrder from "./routes/PlaceOrder";
import ClientDashboard from "./routes/ClientDashboard";
import AdminDashboard from "./routes/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import { ROUTES } from "./routes/constants";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.PLACE_ORDER} element={<PlaceOrder />} />
          
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <PrivateRoute>
                <ClientDashboard />
              </PrivateRoute>
            }
          />
          
          <Route
            path={ROUTES.ADMIN}
            element={
              <PrivateRoute adminOnly>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
