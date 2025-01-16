import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastConfigs } from "~/configs/toast";
import { isAdmin, isAuthentication } from "~/hooks/useAuth";
import Header from "./components/header";

function AdminRoutes({ children }) {
  const navigate = useNavigate();
  const authenticated = isAuthentication();
  const admin = isAdmin();
  const { showToast } = ToastConfigs();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    } else if (!admin) {
      showToast({
        severity: "warn",
        summary: "Access Denied",
        detail: "You do not have admin privileges.",
        life: 3000,
      });
      navigate("/");
    }
  }, [authenticated, admin, navigate, showToast]);

  return authenticated && admin ? (
    <>
      <Header /> {children} 
    </>
  ) : null;
}

export default AdminRoutes;
