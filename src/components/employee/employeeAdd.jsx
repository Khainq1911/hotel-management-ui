import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { ToastConfigs } from "~/configs/toast";
import { createEmployeeService } from "~/services/employee-services";

export default function AddEmployeeDialog({
  isOpenAddDialog,
  setIsOpenAddDialog,
  handleListEmployee,
}) {
  const [payload, setPayload] = useState({});
  const { showToast } = ToastConfigs();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createEmployeeService(payload);
      await handleListEmployee();
      setIsOpenAddDialog(false);
      showToast({
        severity: "success",
        summary: "Successful",
        detail: "Employee added successfully.",
      });
    } catch {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Failed to add employee.",
      });
    }
  };

  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to add this employee?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: handleSubmit,
    });
  };

  return (
    <Dialog
      visible={isOpenAddDialog}
      onHide={() => setIsOpenAddDialog(false)}
      header="Add Employee Form"
      className="min-w-[600px] min-h-[500px]"
      footer={
        <div>
          <Button severity="danger" onClick={() => setIsOpenAddDialog(false)}>
            Cancel
          </Button>
          <Button onClick={confirm}>Create</Button>
        </div>
      }
    >
      <ConfirmDialog />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>Fullname</label>
          <InputText name="username" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label>Birthday</label>
          <Calendar name="dob" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label>Address</label>
          <InputText name="address" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label>Phone</label>
          <InputText name="phone" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <InputText name="email" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <InputText name="password" type="password" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label>Position</label>
          <InputText name="position" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label>Salary</label>
          <InputNumber
            name="salary"
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, salary: e.value }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label>Hired Date</label>
          <Calendar name="hired_date" onChange={handleChange} />
        </div>
      </div>
    </Dialog>
  );
}
