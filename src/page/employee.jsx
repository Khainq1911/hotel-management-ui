import { useEffect, useState } from "react";
import AddEmployeeDialog from "~/components/employee/employeeAdd";
import EmployeeTable from "~/components/employee/employeeTable";
import { formatDate } from "~/configs/dayjs";
import { ToastConfigs } from "~/configs/toast";
import useDebounce from "~/hooks/useDebounce";
import {
  listEmployeeService,
  queryEmployeeService,
} from "~/services/employee-services";

export default function EmployeePage() {
  const [listEmployees, setListEmployees] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);

  const debounceValueSearch = useDebounce(searchInput, 500);
  const { showToast } = ToastConfigs();
  useEffect(() => {
    const queryEmployee = async () => {
      try {
        const res = await queryEmployeeService(debounceValueSearch);
        const data = res.Data.map((employee) => ({
          ...employee,
          dob: formatDate(employee.dob, "DD/MM/YYYY"),
        }));
        if (debounceValueSearch) {
          showToast({
            severity: "success",
            summary: "Successful",
            detail: "Employee refreshed successfully.",
          });
        }
        setListEmployees(data);
      } catch (error) {}
    };
    queryEmployee(); // eslint-disable-next-line
  }, [debounceValueSearch]);

  const handleListEmployee = async () => {
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
  };

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
            searchInput={searchInput}
            setIsOpenAddDialog={setIsOpenAddDialog}
            setSearchInput={setSearchInput}
            handleListEmployee={handleListEmployee}
          />
          <AddEmployeeDialog
            isOpenAddDialog={isOpenAddDialog}
            setIsOpenAddDialog={setIsOpenAddDialog}
            handleListEmployee={handleListEmployee}
          />
        </div>
      )}
    </div>
  );
}
