import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingDetail from "~/components/payment/booking-detail";
import InforBlock from "~/components/payment/customer-details";
import PaymentMethod from "~/components/payment/payment-method";
import Services from "~/components/payment/services-block";
import { ToastConfigs } from "~/configs/toast";
import { getBookingService } from "~/services/booking-services";
import { createPayment } from "~/services/payment";

export default function PaymentPage() {
  const [confirmedItems, setConfirmedItems] = useState([]);
  const [detailBooking, setDetailBooking] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [discount, setDiscount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { showToast } = ToastConfigs();
  const param = useParams();
  const navigate = useNavigate();

  const fetchBookingDetails = useCallback(async () => {
    try {
      const id = param.room_id;
      const response = await getBookingService(id);
      setDetailBooking(response.Data);
    } catch {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Unable to fetch booking details. Please try again later.",
      });
    }
  }, [param.room_id]);

  const processPayment = async () => {
    try {
      await createPayment({
        booking_id: detailBooking.id,
        method: selectedMethod,
        discount: discount,
        final_amount: totalPrice,
      });
      showToast({
        severity: "success",
        summary: "Payment Successful",
        detail: "Your payment has been processed successfully.",
      });
      navigate(`/payment/confirm/${detailBooking.id}/${detailBooking.room_id}`);
    } catch (error) {
      console.log(error)
      showToast({
        severity: "error",
        summary: "Payment Failed",
        detail:
          "An error occurred while processing the payment. Please try again.",
      });
    }
  };

  const confirmPayment = () => {
    confirmDialog({
      message: "Do you want to confirm this payment?",
      header: "Payment Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: processPayment,
    });
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [fetchBookingDetails]);

  return (
    <div className="p-5 bg-[#FAFAFA] h-screen">
      <ConfirmDialog />
      <h1 className="mb-2 text-[24px] font-bold">Payment Details</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <InforBlock detailBooking={detailBooking} />
          <PaymentMethod
            setSelectedMethod={setSelectedMethod}
            selectedMethod={selectedMethod}
          />
        </div>
        <div>
          <Services
            confirmedItems={confirmedItems}
            setConfirmedItems={setConfirmedItems}
          />
        </div>
        <div>
          <BookingDetail
            setTotalPrice={setTotalPrice}
            confirmedItems={confirmedItems}
            detailBooking={detailBooking}
            discount={discount}
            setDiscount={setDiscount}
            confirmPayment={confirmPayment}
          />
        </div>
      </div>
    </div>
  );
}
