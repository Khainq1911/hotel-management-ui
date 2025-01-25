import { RadioButton } from "primereact/radiobutton";

export default function PaymentMethod({ setSelectedMethod, selectedMethod }) {
  const handleSelection = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className="border p-4 shadow rounded-lg h-[200px] mt-4">
      <h1 className="text-[28px] font-bold mb-4">Payment method</h1>
      <div className="grid grid-cols-2 gap-4">
        
        <div
          className={`border rounded-lg shadow flex justify-between items-center p-2 ${
            selectedMethod === "Money" ? "bg-blue-100" : ""
          }`}
          onClick={() => handleSelection("Money")}
        >
          <div className="flex items-center">
            <i className="pi pi-money-bill border rounded-lg p-1 mr-2 shadow"></i>
            <strong>Money</strong>
          </div>
          <RadioButton
            value="Money"
            onChange={() => handleSelection("Money")}
            checked={selectedMethod === "Money"}
          />
        </div>
       
        <div
          className={`border rounded-lg shadow flex justify-between items-center p-2 ${
            selectedMethod === "Credit Card" ? "bg-blue-100" : ""
          }`}
          onClick={() => handleSelection("Credit Card")}
        >
          <div className="flex items-center">
            <i className="pi pi-credit-card border rounded-lg p-1 mr-2 shadow"></i>
            <strong>Credit Card</strong>
          </div>
          <RadioButton
            value="Credit Card"
            onChange={() => handleSelection("Credit Card")}
            checked={selectedMethod === "Credit Card"}
          />
        </div>
      
        <div
          className={`border rounded-lg shadow flex justify-between items-center p-2 ${
            selectedMethod === "Paypal" ? "bg-blue-100" : ""
          }`}
          onClick={() => handleSelection("Paypal")}
        >
          <div className="flex items-center">
            <i className="pi pi-paypal border rounded-lg p-1 mr-2 shadow"></i>
            <strong>Paypal</strong>
          </div>
          <RadioButton
            value="Paypal"
            onChange={() => handleSelection("Paypal")}
            checked={selectedMethod === "Paypal"}
          />
        </div>
      </div>
    </div>
  );
}
