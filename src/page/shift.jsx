import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { shiftColumns } from "~/const/shift";
import { getListShifts } from "~/services/scheduler";

export default function ShiftPage() {
  const [shifts, setShifts] = useState([]);

  const listShifts = async () => {
    try {
      const res = await getListShifts();
      setShifts(res.Data);
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  };

  useEffect(() => {
    listShifts();
  }, []);

  return (
    <div className="p-5">
      <DataTable
        value={shifts}
        tableStyle={{ minWidth: "50rem" }}
        className="shadow-lg rounded-lg overflow-hidden"
        header={
          <div
            className="text-lg font-bold text-white text-center p-4 
                          bg-gradient-to-r from-blue-600 to-blue-800 
                          rounded-t-lg shadow-md tracking-wide uppercase"
          >
            Shift List
          </div>
        }
      >
        {shiftColumns?.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
      </DataTable>
    </div>
  );
}
