import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import { ToastConfigs } from "~/configs/toast";
import EmployeeImage from "~/images/employee.png";
import { updateEmployeeService } from "~/services/employee-services";

export default function Profile({ detailEmployee, handleListEmployee }) {
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [payload, setPayload] = useState({
    phone: detailEmployee?.phone,
    salary: detailEmployee?.salary,
  });
  const { showToast } = ToastConfigs();

  const handleUpdateEmployee = async () => {
    try {
      if (
        payload.phone === detailEmployee.phone &&
        payload.salary === detailEmployee.salary
      ) {
        setIsUpdatingProfile((prev) => !prev);
        return;
      }
      await updateEmployeeService(detailEmployee?.id, payload);
      await handleListEmployee();
      setIsUpdatingProfile((prev) => !prev);
      showToast({
        severity: "success",
        summary: "Profile Updated",
        detail: "Employee details have been successfully updated.",
      });
    } catch {
      showToast({
        severity: "error",
        summary: "Update Failed",
        detail: "Something went wrong. Please try again!",
      });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!isUpdatingProfile) {
      setPayload({
        phone: detailEmployee?.phone,
        salary: detailEmployee?.salary,
      });
    }
  }, [isUpdatingProfile, detailEmployee]);

  return (
    <div className="relative">
      <div className="w-full flex justify-center">
        <Image
          src={EmployeeImage}
          alt="Employee"
          width={200}
          height={200}
          indicatorIcon={<i className="pi pi-search"></i>}
          preview
          className="rounded-full overflow-hidden"
        />
      </div>

      <Button
        className="mt-4 p-2 rounded absolute top-0 right-0"
        severity="danger"
        outlined
        onClick={() =>
          isUpdatingProfile
            ? handleUpdateEmployee()
            : setIsUpdatingProfile((prev) => !prev)
        }
      >
        {isUpdatingProfile ? (
          <i className="pi pi-save" />
        ) : (
          <i className="pi pi-user-edit" />
        )}
      </Button>

      {isUpdatingProfile ? (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <InputText
              onChange={handleChangeInput}
              id="phone"
              name="phone"
              aria-describedby="phone-help"
              value={payload?.phone || ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="salary">Salary</label>
            <InputNumber
              onValueChange={handleChangeInput}
              id="salary"
              name="salary"
              aria-describedby="salary-help"
              value={payload?.salary || ""}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center gap-4 mt-1">
          <div className="grid grid-cols-1 place-content-center place-items-center gap-2">
            <h1>Employee Name</h1>
            <p className="font-bold">{detailEmployee.username}</p>
          </div>

          <div className="grid grid-cols-1 place-content-center place-items-center gap-2">
            <h1>Salary</h1>
            <p className="font-bold">{detailEmployee.salary}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 place-content-center place-items-center gap-2">
              <h1>Position</h1>
              <p className="font-bold">{detailEmployee.position}</p>
            </div>
            <div className="grid grid-cols-1 place-content-center place-items-center gap-2">
              <h1>Address</h1>
              <p className="font-bold">{detailEmployee.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
