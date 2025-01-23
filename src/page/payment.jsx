import BookingDetail from "~/components/payment/booking-detail";
import InforBlock from "~/components/payment/customer-details";
import ReservationBlock from "~/components/payment/payment-method";
import Services from "~/components/payment/services-block";

export default function PaymentPage() {
  return (
    <div className="p-5 bg-[#FAFAFA] h-screen">
      <h1 className="mb-2 text-[24px] font-bold">Bill 1</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="">
          <InforBlock />
          <ReservationBlock />
        </div>
        <div>
          <Services />
        </div>
        <div>
          <BookingDetail />
        </div>
      </div>
    </div>
  );
}
