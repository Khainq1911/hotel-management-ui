import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { useCallback, useState } from "react";

export default function BookingDetail({
  confirmedItems,
  detailBooking,
  setTotalPrice,
  discount,
  setDiscount,
  confirmPayment
}) {
  const [openDiscountModal, setOpenDiscountModal] = useState(false);

  const handleCalTotalPrice = useCallback(() => {
    const bookingPrice = detailBooking?.total_price || 0;
    const servicePrice = confirmedItems?.totalPrice || 0;
    const totalDiscount = (bookingPrice * discount) / 100;
    const total = bookingPrice + servicePrice - totalDiscount;
    setTotalPrice(total > 0 ? total : 0);
    return total > 0 ? total : 0;
  }, [detailBooking, confirmedItems, discount, setTotalPrice]);

  return (
    <div className="w-full max-w-[350px] rounded-lg px-2">
      <img
        alt="Room"
        src={detailBooking?.img_url}
        className="shadow rounded-lg w-full h-[150px] object-cover"
      />

      <div className="mt-4">
        <p className="text-[24px] font-bold">{detailBooking?.room_name}</p>
        <p className="text-[14px] my-2">{detailBooking?.typeroom_name}</p>
        <div className="flex items-center">
          <i className="pi pi-money-bill mr-2" style={{ fontSize: 16 }}></i>
          <p className="text text-[#06B6D4] font-bold">
            {detailBooking?.daily_price?.toLocaleString()} VND <span>| </span>
            {detailBooking?.hourly_price?.toLocaleString()} VND
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <i className="pi pi-users mr-2" style={{ fontSize: 16 }}></i>
            <p className="text">
              {detailBooking?.standard_capacity} - {detailBooking?.max_capacity}
            </p>
          </div>
          <div className="flex items-center">
            <i className="pi pi-wifi mr-2" style={{ fontSize: 16 }}></i>
            <p className="text">Free WiFi</p>
          </div>
          <div className="flex items-center">
            <i className="pi pi-car mr-2" style={{ fontSize: 16 }}></i>
            <p className="text">Airport Shuttle</p>
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <h1 className="text-[24px] font-bold mb-2">Detail Price</h1>

        <div className="flex justify-between">
          <p>Booking Price:</p>
          <strong>
            VND {detailBooking?.total_price?.toLocaleString() || 0}
          </strong>
        </div>
        <div className="flex justify-between">
          <p>Service Price:</p>
          <strong>
            VND {confirmedItems?.totalPrice?.toLocaleString() || 0}
          </strong>
        </div>
        <div className="flex justify-between">
          <p>Discount:</p>
          <strong>
            -VND{" "}
            {((detailBooking?.total_price * discount) / 100).toLocaleString()}
          </strong>
        </div>
        <div className="flex justify-between">
          <div
            className="cursor-pointer font-semibold"
            onClick={() => setOpenDiscountModal(true)}
          >
            Add discount
          </div>
          <strong>{discount || 0}(%)</strong>
        </div>

        <Dialog
          header="Discount"
          visible={openDiscountModal}
          onHide={() => setOpenDiscountModal(false)}
          footer={
            <Button
              label="Confirm"
              severity="secondary"
              onClick={() => setOpenDiscountModal(false)}
              outlined
            />
          }
        >
          <InputNumber
            value={discount}
            onValueChange={(e) => setDiscount(e.value || 0)}
            mode="decimal"
            min={0}
            max={100}
            showButtons
            decrementButtonClassName="p-button-danger"
            incrementButtonClassName="p-button-success"
            placeholder="Enter discount (%)"
            className=""
          />
        </Dialog>

        <Divider />

        <div className="flex justify-between">
          <strong>Total:</strong>
          <strong>VND {handleCalTotalPrice().toLocaleString()}</strong>
        </div>

        <Button
          label={`Confirm and Pay VND ${handleCalTotalPrice().toLocaleString()}`}
          className="w-full mt-4"
          severity="warning"
          outlined
          onClick={confirmPayment}
        />
      </div>
    </div>
  );
}
