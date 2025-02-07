import emp_img from "~/images/employee.png";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import {
  columns,
  headerModalItems,
  InputData,
  updateFormField,
} from "~/const/employee";
import { Image } from "primereact/image";
import {
  listEmployeeService,
  updateEmployeeService,
} from "~/services/employee-services";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { TabMenu } from "primereact/tabmenu";
import { ToastConfigs } from "~/configs/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { formatDate } from "~/configs/dayjs";
export default function EmployeePage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [employeeDataTable, setEmployeeDataTable] = useState([]);
  const [updateForm, setUpdateForm] = useState({});
  const [defaultEmp, setDefaultEmp] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { showToast } = ToastConfigs();

  const confirmUpdate = () => {
    confirmDialog({
      message: "Are you sure you want to update this record?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: handleSubmitForm,
    });
  };
  const listEmployeesFunc = async () => {
    try {
      const res = await listEmployeeService();
      setEmployeeDataTable(
        res.Data.map((employee) => ({
          id: employee.id,
          username: employee.username,
          address: employee.address,
          email: employee.email,
          dob: formatDate(employee.dob),
          age: employee.age,
          phone: employee.phone,
          position: employee.position,
          salary: employee.salary,
          hired_date: formatDate(employee.hired_date),
        }))
      );
    } catch (error) {}
  };
  const handleSubmitForm = async () => {
    try {
      const id = defaultEmp.id;
      delete updateForm.id;
      await updateEmployeeService(id, updateForm);
      listEmployeesFunc();
      showToast({
        severity: "success",
        summary: "Update Successful",
        detail: "Welcome back!",
      });
    } catch (error) {
      console.log(error);
      showToast({
        severity: "error",
        summary: "Login Successful",
        detail: "Welcome back!",
      });
    }
  };

  const handleChangeInput = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    listEmployeesFunc();
  }, []);
  useEffect(() => {
    setUpdateForm(defaultEmp);
  }, [defaultEmp]);
  return (
    <div className="p-6">
      <ConfirmDialog />
      <FloatLabel className="mb-5">
        <label>Search employee</label>
        <InputText placeholder="Username or ID" className="w-60" />
      </FloatLabel>

      <Dialog
        header={
          <TabMenu
            model={headerModalItems}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          />
        }
        visible={isModalOpen}
        onHide={() => {
          if (!isModalOpen) return;
          setIsModalOpen(false);
          setIsUpdating(false);
        }}
        className="w-[1000px]"
      >
        {activeIndex === 0 && (
          <div className="flex mt-2 items-center">
            <Image src={emp_img} alt="employee-image" width="200" />
            <div className="w-full">
              <div className="grid grid-cols-3 gap-4 mt-4 ml-20">
                {updateFormField.map((field) => (
                  <InputData
                    key={field.code}
                    label={field.label}
                    value={updateForm[field.code]}
                    code={field.code}
                    bool={isUpdating}
                    isNum={field.isNum}
                    handleChange={handleChangeInput}
                  />
                ))}
              </div>
              <Divider />
              <div className="flex justify-end mt-2">
                {!isUpdating ? (
                  <Button
                    onClick={() => setIsUpdating(!isUpdating)}
                    label="Update"
                    severity="secondary"
                  />
                ) : (
                  <>
                    <Button
                      label="Cancel"
                      severity="danger"
                      className="mr-2"
                      onClick={() => {
                        setUpdateForm(defaultEmp);
                        setIsUpdating(!isUpdating);
                      }}
                    />
                    <Button
                      onClick={() => {
                        setIsUpdating(!isUpdating);
                        confirmUpdate();
                      }}
                      label="Confirm"
                      severity="warning"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </Dialog>

      <DataTable
        value={employeeDataTable}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
        <Column
          body={(rowData) => (
            <Button
              severity="warning"
              outlined
              tooltip="Click to show detail"
              tooltipOptions={{ position: "left" }}
              onClick={() => {
                setDefaultEmp(rowData);
                setIsModalOpen(true);
              }}
              label={<i className="pi pi-user-edit text-[18px]"></i>}
            />
          )}
        />
      </DataTable>
    </div>
  );
}
