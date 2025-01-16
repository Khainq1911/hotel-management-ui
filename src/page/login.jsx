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

export default function EmployeePage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [employeeTableData, setEmployeeTableData] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { showToast } = ToastConfigs();

  const fetchEmployees = async () => {
    try {
      const response = await listEmployeeService();
      const employees = response.Data.map((employee) => ({
        id: employee.id,
        username: employee.username,
        address: employee.address,
        email: employee.email,
        dob: employee.dob,
        age: employee.age,
        phone: employee.phone,
        position: employee.position,
        salary: employee.salary,
        hired_date: employee.hired_date,
      }));
      setEmployeeTableData(employees);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const { id, ...updatedFields } = formData;
      await updateEmployeeService(id, updatedFields);
      fetchEmployees();
      showToast({
        severity: "success",
        summary: "Update Successful",
        detail: "Employee record has been updated successfully!",
      });
    } catch (error) {
      console.error("Failed to update employee:", error);
      showToast({
        severity: "error",
        summary: "Update Failed",
        detail: "An error occurred while updating the employee record.",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const confirmUpdate = () => {
    confirmDialog({
      message: "Are you sure you want to update this record?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: handleFormSubmit,
    });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setFormData(selectedEmployee);
  }, [selectedEmployee]);

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
            activeIndex={activeTabIndex}
            onTabChange={(e) => setActiveTabIndex(e.index)}
          />
        }
        visible={isModalVisible}
        onHide={() => {
          if (!isModalVisible) return;
          setIsModalVisible(false);
          setIsUpdating(false);
        }}
        className="w-[60%]"
      >
        {activeTabIndex === 0 && (
          <div className="flex mt-2 items-center">
            <Image src={emp_img} alt="Employee" width="200" />
            <div className="w-full">
              <div className="grid grid-cols-3 gap-4 mt-4 ml-20">
                {updateFormField.map((field) => (
                  <InputData
                    key={field.code}
                    label={field.label}
                    value={formData[field.code]}
                    code={field.code}
                    editable={isUpdating}
                    handleChange={handleInputChange}
                  />
                ))}
              </div>
              <Divider />
              <div className="flex justify-end mt-2">
                {!isUpdating ? (
                  <Button
                    onClick={() => setIsUpdating(true)}
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
                        setFormData(selectedEmployee);
                        setIsUpdating(false);
                      }}
                    />
                    <Button
                      onClick={() => {
                        setIsUpdating(false);
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
        value={employeeTableData}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        {columns.map((column) => (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
          />
        ))}
        <Column
          body={(rowData) => (
            <Button
              severity="warning"
              outlined
              tooltip="Click to show detail"
              tooltipOptions={{ position: "left" }}
              onClick={() => {
                setSelectedEmployee(rowData);
                setIsModalVisible(true);
              }}
              label={<i className="pi pi-user-edit text-[18px]"></i>}
            />
          )}
        />
      </DataTable>
    </div>
  );
}
