import { Link } from "react-router-dom";

export const items = [
  {
    label: "Home",
    icon: "pi pi-home",
    isAdmin: true,
    url: "/",
  },
  {
    label: "Employee",
    icon: "pi pi-star",
    isAdmin: false,
    url: "/employee",
  },
  {
    label: "Room",
    icon: "pi pi-envelope",
    isAdmin: false,
    url: "/room",
  },
];
