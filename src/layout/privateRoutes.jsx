import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthentication } from "~/hooks/useAuth";
import Header from "./components/header";

function PrivateRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthentication()) {
      navigate("/login");
    }
  }, [navigate]);

  return isAuthentication() ? (
    <>
      <Header />
      {children}
    </>
  ) : null;
}

export default PrivateRoutes;
