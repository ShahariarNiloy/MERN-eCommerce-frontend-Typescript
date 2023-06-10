import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, RouteProps } from "react-router-dom";
import { RootState } from "../../redux/store";
import Loader from "../Layout/Loader/Loader";

type CustomRouteProps = RouteProps & {
  isAdmin?: boolean;
  component: React.ComponentType<any>;
};

const ProtectedRoute: React.FC<CustomRouteProps> = ({
  isAdmin,
  component: Component,
  ...rest
}) => {
  const { loading, isAuthenticated, user }: any = useSelector(
    (state: RootState) => state.user
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      element={
        isAuthenticated === false ? (
          <Navigate to="/login" replace />
        ) : isAdmin === true && user?.role !== "admin" ? (
          <Navigate to="/login" replace />
        ) : (
          <Component />
        )
      }
    />
  );
};

export default ProtectedRoute;
