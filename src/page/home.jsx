import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "~/components/booking/booking-form";
import { ToastConfigs } from "~/configs/toast";
import { getUser } from "~/hooks/useAuth";
import { createBookingService } from "~/services/booking-services";
import { listRoomServices } from "~/services/roomServices";

export default function Home() {
  const navigate = useNavigate();
  const [dates, setDates] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listRoom, setListRoom] = useState();
  const [customerInfor, setCustomerInfor] = useState();
  const [detailRoom, setDetailRoom] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const { showToast } = ToastConfigs();
  const listRoomFunc = useCallback(async () => {
    try {
      const res = await listRoomServices();
      setListRoom(res.Data);
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Fetch Failed",
        detail:
          error.response?.data?.Message ||
          "An error occurred while fetching rooms.",
      });
    } // eslint-disable-next-line
  }, []);

  const handleBooking = async () => {
    try {
      await createBookingService({
        employee_id: getUser().id,
        guest_id: customerInfor.customer_id,
        room_id: detailRoom.id,
        check_in_time: dates[0],
        check_out_time: dates[1],
        total_price: totalPrice,
      });
      showToast({
        severity: "success",
        summary: "Customer Created",
        detail: "Customer information saved successfully.",
      });
      listRoomFunc();
      setIsOpenModal(false);
      setDates(null);
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Fetch Failed",
        detail:
          error.response?.data?.Message ||
          "An error occurred while fetching rooms.",
      });
    }
  };

  const confirmBooking = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: handleBooking,
    });
  };

  useEffect(() => {
    listRoomFunc();
  }, [listRoomFunc]);

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 place-content-center place-items-center p-6 gap-6">
      <ConfirmDialog />
      <Dialog
        visible={isOpenModal}
        header={"Room"}
        onHide={() => {
          setIsOpenModal(false);
          setDates(null);
        }}
        className="w-[60%]"
        footer={
          <div className="mt-4">
            <Button
              severity="danger"
              outlined
              label="Cancel"
              onClick={() => {
                setIsOpenModal(false);
                setDates(null);
              }}
            />
            <Button
              outlined
              severity="secondary"
              label="Booking"
              className="ml-2"
              onClick={confirmBooking}
            />
          </div>
        }
      >
        <BookingForm
          detailRoom={detailRoom}
          dates={dates}
          setDates={setDates}
          customerInfor={customerInfor}
          setCustomerInfor={setCustomerInfor}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      </Dialog>
      {listRoom?.map((room, i) => (
        <Card
          key={i}
          subTitle={room.typeroom_name}
          footer={
            room?.booking_status ? (
              <Button
                className="hover:scale-110 transition"
                outlined
                severity="success"
                onClick={() => {
                  navigate(`/payment/${room.id}`);
                }}
              >
                Thanh toan
              </Button>
            ) : (
              <Button
                className="hover:scale-110 transition"
                outlined
                severity="success"
                onClick={() => {
                  setDetailRoom(room);
                  setIsOpenModal(true);
                }}
              >
                View more
              </Button>
            )
          }
          title={room.name}
          header={
            <img
              alt="Card"
              src={room.img_url}
              className="object-cover rounded h-[120px] hover:scale-110 transition "
            />
          }
          className="w-[280px]  shadow rounded overflow-hidden"
        >
          <div className="grid grid-cols-2">
            <strong>Cleaning:</strong>
            <p>{room.cleaning_status ? "Clean" : "Dirty"}</p>
          </div>
          <div className="grid grid-cols-2">
            <strong>Room:</strong>
            <p>{room.booking_status ? "Booked" : "Available"}</p>
          </div>
          <div className="grid grid-cols-2">
            <strong>Pricing:</strong>
            <p>
              {room.hourly_price}
              <i className="pi pi-dollar text-[12px]"></i> - {room.daily_price}
              <i className="pi pi-dollar text-[12px]"></i>
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
