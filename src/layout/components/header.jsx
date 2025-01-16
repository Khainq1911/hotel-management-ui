import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { items } from "~/const/header";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <Menubar model={items} />
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
