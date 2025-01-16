import { router } from "./configs/router";
import EmployeePage from "./page/employee";
import Home from "./page/home";
import LoginPage from "./page/login";

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
];

export { publicRoutes, privateRoutes, adminRoutes };
