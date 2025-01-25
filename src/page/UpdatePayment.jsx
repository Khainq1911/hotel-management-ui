import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastConfigs } from "~/configs/toast";
import { getPayment, updatePayment } from "~/services/payment";

export default function ConfirmPayment() {
  const { booking_id, room_id } = useParams(); 
  const { showToast } = ToastConfigs(); 
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState(null); 
  console.log(booking_id, room_id)
  const handleGetPayment = async () => {
    try {
      const res = await getPayment(booking_id, room_id);
      setPaymentMethod(res.Data?.method || null); 
    } catch (error) {
      console.error("Error fetching payment details:", error);
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Failed to retrieve payment details.",
      });
    }
  };

  const handleUpdatePayment = async () => {
    try {
      await updatePayment(booking_id, room_id);
      showToast({
        severity: "success",
        summary: "Payment Successful",
        detail: "Your payment has been processed successfully.",
      });
      navigate("/")
    } catch (error) {
      
      showToast({
        severity: "error",
        summary: "Payment Failed",
        detail: "An error occurred while processing the payment. Please try again.",
      });
    }
  };

  const confirmPayment = () => {
    confirmDialog({
      message: "Are you sure you want to confirm this payment?",
      header: "Payment Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: handleUpdatePayment,
    });
  };

  useEffect(() => {
    handleGetPayment();
  }, []);

  return (
    <div className="p-4 ">
      <ConfirmDialog />
      <div className="mb-4">
        {paymentMethod === "Money" ? (
          <div className="text-lg font-semibold text-green-600">
            Please collect cash for this payment!
          </div>
        ) : (
          <div className="text-lg font-semibold text-blue-600">
            Payment method: {paymentMethod || "Unknown"}
          </div>
        )}
      </div>
      <Button label="Confirm Payment" onClick={confirmPayment} className="p-button-success" />
    </div>
  );
}
