import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { ToastConfigs } from "~/configs/toast";
import { columns } from "~/const/salary";
import { updatePayroll } from "~/services/payroll";
import PayrollDialog from "./detailPayroll";
export default function ListPayroll({ listPayrolls, handleGetPayroll }) {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const { showToast } = ToastConfigs();
  const cities = [
    { name: "All Status", code: "NY" },
    { name: "Completed", code: "RM" },
    { name: "Pending", code: "LDN" },
  ];

  const handleUpdatePayroll = async (payroll) => {
    try {
      if (payroll.status === "Completed") return;
      await updatePayroll({ status: "Completed" }, payroll.id);
      await handleGetPayroll();
      showToast({
        severity: "success",
        summary: "Login Successful",
        detail: "Welcome back!",
      });
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Login Failed",
        detail: error.response.data.Message,
      });
    }
  };

  const statusTemplate = (rowData) => {
    return (
      <Button
        severity={rowData.status === "Pending" ? "warning" : "success"}
        outlined
        disabled={rowData.status === "Pending" ? false : true}
        onClick={() => handleUpdatePayroll(rowData)}
      >
        {rowData.status}
      </Button>
    );
  };
  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        label={<i className="pi pi-eye"></i>}
        severity="secondary"
        outlined
        raised
        onClick={() => {
          setIsDialogOpen(true);
          setSelectedPayroll(rowData);
        }}
      />
    </div>
  );

  return (
    <div className="border rounded-lg p-4 mt-4">
      <PayrollDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedPayroll={selectedPayroll}
        handleUpdatePayroll={handleUpdatePayroll}
      />
      <header className="flex justify-between items-center mb-4">
        <p className="font-medium">Payroll List</p>
        <div className="flex gap-2">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText placeholder="Search" />
          </IconField>
          <Dropdown
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Select Status"
            className="w-[150px]"
          />
        </div>
      </header>

      <DataTable value={listPayrolls}>
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            style={{ width: col.width }}
          />
        ))}
        <Column
          field="status"
          header="Status"
          style={{ width: "120px" }}
          body={statusTemplate}
        />
        <Column
          field="action"
          header="Action"
          style={{ width: "80px" }}
          body={actionTemplate}
        />
      </DataTable>
    </div>
  );
}
