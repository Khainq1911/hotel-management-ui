import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";
import { listEmployeeService } from "~/services/employee-services";

export default function UpdateScheduler({ isModalOpen, setIsModalOpen }) {
  const [listEmployee, setListEmployee] = useState([]);
  const [updateForm, setUpdateForm] = useState();

  const shiftStatus = [
    { name: "Active", code: "active" },
    { name: "Inactive", code: "inactive" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name, value) => {
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleListEmployee = async () => {
    try {
      const res = await listEmployeeService();
      setListEmployee(res.Data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    if (listEmployee.length === 0) {
      handleListEmployee();
    }
  }, [listEmployee]);

  return (
    <Dialog
      visible={isModalOpen}
      onHide={() => setIsModalOpen(false)}
      header="Update shifts"
      className="w-[300px]"
      footer={
        <div>
          <Button label="Cancel" severity="danger" outlined onClick={() => setIsModalOpen(false)} />
          <Button label="Confirm" severity="warning" outlined onClick={() => console.log(updateForm)} />
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="flex-auto">
          <label htmlFor="employee_id" className="font-bold block mb-2">
            Employee
          </label>
          <Dropdown
            name="employee_id"
            value={updateForm?.employee_id}
            onChange={(e) => handleDropdownChange("employee_id", e.value)}
            options={listEmployee.map((employee) => ({
              name: employee.username,
              code: employee.id,
            }))}
            optionLabel="name"
            placeholder="Select employee"
            className="w-full md:w-14rem"
          />
        </div>
        <div className="flex-auto">
          <label htmlFor="status" className="font-bold block mb-2">
            Shift status
          </label>
          <Dropdown
            name="status"
            value={updateForm?.status}
            onChange={(e) => handleDropdownChange("status", e.value)}
            options={shiftStatus}
            optionLabel="name"
            placeholder="Select status"
            className="w-full md:w-14rem"
          />
        </div>
        <div className="flex-auto">
          <label htmlFor="notes" className="font-bold block mb-2">
            Notes
          </label>
          <InputTextarea
            name="notes"
            id="notes"
            value={updateForm?.notes}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>
    </Dialog>
  );
}
