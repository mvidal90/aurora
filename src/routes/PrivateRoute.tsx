import { use } from "react";
import { Navigate, Outlet } from "react-router"
import PrivateLayout from '../layouts/PrivateLayout'
import AuthContext from "../context/AuthContext";

function PrivateRoute() {

  const { user } = use(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <PrivateLayout 
      loading={false}
      >
        <Outlet />
    </PrivateLayout>
  )
}

export default PrivateRoute