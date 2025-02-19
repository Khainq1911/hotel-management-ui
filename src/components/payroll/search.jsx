import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";

export default function Search({ dates, setDates }) {
  return (
    <div className="flex justify-between">
      <Calendar
        value={dates}
        onChange={(e) => setDates(e.value)}
        selectionMode="range"
        readOnlyInput
        hideOnRangeSelection
        showButtonBar
        placeholder="Date Range"
        dateFormat="dd MM yy"
        className="w-[300px]"
      />

      <Button>
        <i className="pi pi-plus mr-2"></i> New Payroll
      </Button>
    </div>
  );
}
