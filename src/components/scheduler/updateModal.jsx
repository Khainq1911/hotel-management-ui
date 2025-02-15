import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { ToastConfigs } from "~/configs/toast";

import { listEmployeeService } from "~/services/employee-services";
import { UpdateSchedulerService } from "~/services/scheduler";

export default function UpdateScheduler({
  isModalOpen,
  setIsModalOpen,
  detailEvent,
  handleGetScheduler,
}) {
  const [listEmployee, setListEmployee] = useState([]);
  const [employee, setEmployee] = useState(null);
  const { showToast } = ToastConfigs();

  const handleListEmployee = async () => {
    try {
      const res = await listEmployeeService();
      setListEmployee(res.Data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleOpenEvent = () => {
    if (!detailEvent || !listEmployee.length) return;

    const filteredEmployee = listEmployee.find(
      (emp) => emp.id === detailEvent.employee_id
    );

    if (filteredEmployee) {
      setEmployee({
        name: filteredEmployee.username,
        code: filteredEmployee.id,
      });
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await UpdateSchedulerService(detailEvent.id, {
        employee_id: employee.code,
      });
      handleGetScheduler();
      setIsModalOpen(false);
      showToast({
        severity: "success",
        summary: "Update Successful",
        detail: "Shift updated successfully!",
      });
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Update Failed",
        detail: "An error occurred while updating.",
      });
    }
  };

  const handleConfirm = () => {
    confirmDialog({
      message: "Are you sure you want to update this shift?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: handleUpdateEvent,
    });
  };

  useEffect(() => {
    if (listEmployee.length === 0) {
      handleListEmployee();
    }
  }, [listEmployee]);

  useEffect(() => {
    if (isModalOpen && listEmployee.length > 0) {
      handleOpenEvent();
    } // eslint-disable-next-line
  }, [isModalOpen, listEmployee]);

  return (
    <Dialog
      visible={isModalOpen}
      onHide={() => setIsModalOpen(false)}
      header="Update shifts"
      className="w-[300px]"
      footer={
        <div>
          <Button
            label="Cancel"
            severity="danger"
            outlined
            onClick={() => setIsModalOpen(false)}
          />
          <Button
            label="Confirm"
            severity="warning"
            outlined
            onClick={handleConfirm}
          />
        </div>
      }
    >
      <ConfirmDialog />
      <div className="grid grid-cols-1 gap-4">
        <div className="flex-auto">
          <label htmlFor="employee_id" className="font-bold block mb-2">
            Employee
          </label>
          <Dropdown
            name="employee_id"
            value={employee}
            onChange={(e) => setEmployee(e.value)}
            options={listEmployee.map((emp) => ({
              name: emp.username,
              code: emp.id,
            }))}
            optionLabel="name"
            placeholder="Select employee"
            className="w-full md:w-14rem"
          />
        </div>
      </div>
    </Dialog>
  );
}
