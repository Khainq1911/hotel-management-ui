import { router } from "./configs/router";
import EmployeePage from "./page/employee";
import Home from "./page/home";
import LoginPage from "./page/login";

const publicRoutes = [
  {
    path: router.home,
    component: Home,
  },
  {
    path: router.employee,
    component: EmployeePage,
  },
  {
    path: router.login,
    component: LoginPage,
  },
];

const privateRoutes = [];
const adminRoutes = [];

export { publicRoutes };
