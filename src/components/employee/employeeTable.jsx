import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { columns } from "~/const/employee";
import EmployeeDetail from "./employeeDetail/employeeDetail";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

export default function EmployeeTable({
  listEmployees,
  handleListEmployee,
  searchInput,
  setSearchInput,
  setIsOpenAddDialog,
}) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [detailEmployee, setDetailEmployee] = useState(null);

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        label={<i className="pi pi-eye"></i>}
        severity="secondary"
        outlined
        raised
        onClick={() => {
          setIsOpenDialog(true);
          setDetailEmployee(rowData);
        }}
      />
    </div>
  );

  return (
    <div className="border rounded-xl p-4">
      <EmployeeDetail
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        detailEmployee={detailEmployee}
        handleListEmployee={handleListEmployee}
      />
      <div className="flex justify-between items-center mb-4">
        <p className="font-medium">Employee Management</p>
        <div className="flex gap-4">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-[200px]"
            />
          </IconField>

          <Button
            severity="success"
            className="flex justify-between items-center w-[90px]"
            onClick={() => setIsOpenAddDialog(true)}
          >
            <i className="pi pi-plus-circle" />
            <p>Add</p>
          </Button>
        </div>
      </div>
      <DataTable
        value={listEmployees}
        stripedRows
        style={{ minWidth: "700px" }}
        tableStyle={{ minWidth: "50rem" }}
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            style={{ width: "150px" }}
          />
        ))}
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
