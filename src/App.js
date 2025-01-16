import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { adminRoutes, privateRoutes, publicRoutes } from "./router";
import PrivateRoutes from "./layout/privateRoutes";
import AdminRoutes from "./layout/adminRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoutes>
                  <Page />
                </PrivateRoutes>
              }
            />
          );
        })}
        {adminRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <AdminRoutes>
                  <Page />
                </AdminRoutes>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
