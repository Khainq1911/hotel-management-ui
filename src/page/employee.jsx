import { useCallback, useEffect, useState } from "react";
import EmployeeTable from "~/components/employee/employeeTable";
import { formatDate } from "~/configs/dayjs";
import { listEmployeeService } from "~/services/employee-services";

export default function EmployeePage() {
  const [listEmployees, setListEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleListEmployee = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listEmployeeService();
      const data = res.Data.map((employee) => ({
        ...employee,
        dob: formatDate(employee.dob, "DD/MM/YYYY"),
      }));
      setListEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleListEmployee();
  }, [handleListEmployee]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="animate-spin text-blue-500 text-2xl"></i>
        </div>
      ) : (
        <div className="p-5">
          <EmployeeTable
            listEmployees={listEmployees}
            handleListEmployee={handleListEmployee}
          />
        </div>
      )}
    </div>
  );
}
