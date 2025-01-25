import { router } from "./configs/router";
import EmployeePage from "./page/employee";
import Home from "./page/home";
import LoginPage from "./page/login";
import PaymentPage from "./page/payment";
import RoomPage from "./page/room";
import ConfirmPayment from "./page/UpdatePayment";

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
  {
    path: router.payment,
    component: PaymentPage,
  },
  {
    path: router.confirmPayment,
    component: ConfirmPayment,
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
