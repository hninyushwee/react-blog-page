import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { localUserData } = useAuth();

  return <div>{localUserData ? children : <Navigate to="/login" />}</div>;
}

export default ProtectedRoute;
