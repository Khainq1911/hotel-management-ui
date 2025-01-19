import { router } from "./configs/router";
import EmployeePage from "./page/employee";
import Home from "./page/home";
import LoginPage from "./page/login";
import RoomPage from "./page/room";

const publicRoutes = [
  {
    path: router.login,
    component: LoginPage,
  },
];

const privateRoutes = [
  {
    path: router.home,
    component: Home,
  },
];
const adminRoutes = [
  {
    path: router.employee,
    component: EmployeePage,
  },
  {
    path: router.room,
    component: RoomPage,
  },
];

export { publicRoutes, privateRoutes, adminRoutes };
