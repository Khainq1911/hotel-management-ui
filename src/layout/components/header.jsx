import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { items } from "~/const/header";
import { isAdmin } from "~/hooks/useAuth";

export default function Header() {
  const [itemsAccordingRole, setItemsAccordingRole] = useState();

  useEffect(() => {
    if (!isAdmin()) {
      setItemsAccordingRole(items.filter((item) => item.isAdmin === true));
    } else {
      setItemsAccordingRole(items);
    }
  }, []);
  const navigate = useNavigate();
  return (
    <div className="relative">
      <Menubar model={itemsAccordingRole} />
      <Button
        severity="secondary"
        className="absolute top-[50%] translate-y-[-50%] right-2"
        onClick={() => {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
}
