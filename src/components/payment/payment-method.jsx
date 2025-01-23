import { RadioButton } from "primereact/radiobutton";

export default function ReservationBlock() {
  return (
    <div className="border p-4 shadow rounded-lg h-[200px] mt-4">
      <h1 className="text-[28px] font-bold mb-4">Payment method</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg shadow flex justify-between items-center p-2">
          <div className="flex items-center">
            <i className="pi pi-money-bill border rounded-lg p-1 mr-2 shadow"></i>
            <strong>Money</strong>
          </div>
          <RadioButton />
        </div>
        <div className="border rounded-lg shadow flex justify-between items-center p-2">
          <div className="flex items-center">
            <i className="pi pi-credit-card border rounded-lg p-1 mr-2 shadow"></i>
            <strong>Credit Card</strong>
          </div>
          <RadioButton />
        </div>
        <div className="border rounded-lg shadow flex justify-between items-center p-2">
          <div className="flex items-center">
            <i className="pi pi-paypal border rounded-lg p-1 mr-2 shadow"></i>
            <strong>Paypal</strong>
          </div>
          <RadioButton />
        </div>
      </div>
    </div>
  );
}
