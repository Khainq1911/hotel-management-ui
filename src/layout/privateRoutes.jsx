import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthentication } from "~/hooks/useAuth";

function PrivateRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthentication()) {
      navigate("/login");
    }
  }, [navigate]);

  return isAuthentication() ? <>{children}</> : null;
}

export default PrivateRoutes;
