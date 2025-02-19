import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

export default function PayrollDialog({
  isDialogOpen,
  setIsDialogOpen,
  selectedPayroll,
  handleUpdatePayroll,
}) {
  return (
    <Dialog
      visible={isDialogOpen}
      onHide={() => setIsDialogOpen(false)}
      header={`Payroll ${selectedPayroll?.id}`}
      className="w-[450px]"
      resizable={false}
      position="top"
    >
      {selectedPayroll && (
        <div>
          <div>
            <h3 className="text-lg mb-2 font-medium">Employee Information</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2">
                <span>Name:</span>
                <strong>{selectedPayroll.employee_name}</strong>
              </div>
              <div className="grid grid-cols-2">
                <span>Employee ID:</span>
                <strong>{selectedPayroll.employee_id}</strong>
              </div>
              <div className="grid grid-cols-2">
                <span>Pay Period Start:</span>
                <strong>{selectedPayroll.pay_period_start}</strong>
              </div>
              <div className="grid grid-cols-2">
                <span>Pay Period Start:</span>
                <strong>{selectedPayroll.pay_period_end}</strong>
              </div>
            </div>
          </div>
          <Divider />
          <div>
            <h3 className="text-lg mb-2 mt-4 font-medium">Payroll Details</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2">
                <span>Net Salary:</span>
                <strong>{selectedPayroll.net_salary} VND</strong>
              </div>
              <div className="grid grid-cols-2">
                <span>Paid Date:</span>
                <strong>{selectedPayroll.payment_date}</strong>
              </div>
              <div className="grid grid-cols-2">
                <span>Notes:</span>
                <strong>{selectedPayroll.notes || "N/A"}</strong>
              </div>
              <div className="grid grid-cols-2">
                <span>Status:</span>
                <Button
                  severity={
                    selectedPayroll.status === "Pending" ? "warning" : "success"
                  }
                  outlined
                  disabled={selectedPayroll.status === "Pending" ? false : true}
                  onClick={() => handleUpdatePayroll(selectedPayroll)}
                  className="w-[120px]"
                >
                  {selectedPayroll.status}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
