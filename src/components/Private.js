import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function Private() {
  const data = localStorage.getItem("user");

  return data ? <Outlet /> : <Navigate to="/user" />;
}
