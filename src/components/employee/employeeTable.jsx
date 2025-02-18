import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { columns } from "~/const/employee";
import EmployeeDetail from "./employeeDetail/employeeDetail";

export default function EmployeeTable({ listEmployees, handleListEmployee }) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [detailEmployee, setDetailEmployee] = useState(null);

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        label="Detail"
        severity="warning"
        outlined
        raised
        onClick={() => {
          setIsOpenDialog(true);
          setDetailEmployee(rowData);
        }}
      />
      <Button label="Delete" severity="danger" outlined raised />
    </div>
  );

  return (
    <div>
      <EmployeeDetail
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        detailEmployee={detailEmployee}
        handleListEmployee={handleListEmployee}
      />
      <DataTable
        value={listEmployees}
        stripedRows
        style={{ minWidth: "700px" }}
        tableStyle={{ minWidth: "50rem" }}
        header={
          <div className="flex justify-between items-center">
            <p>Employee Management</p>
            <Button
              severity="success"
              className="flex justify-between items-center w-[90px]"
            >
              <i className="pi pi-plus-circle" />
              <p>Add</p>
            </Button>
          </div>
        }
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
          style={{ width: "150px" }}
          body={actionTemplate}
        />
      </DataTable>
    </div>
  );
}
