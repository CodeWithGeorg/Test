// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";
import { ROUTES } from "../routes/constants";

export default function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Spinner size="large" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
}
