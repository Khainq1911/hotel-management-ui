import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { router } from "./configs/router";
import EmployeePage from "./page/employee";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={router.employee} Component={EmployeePage} />
      </Routes>
    </Router>
  );
}

export default App;
