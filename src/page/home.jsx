import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import BookingForm from "~/components/booking/booking-form";
import Card from "~/components/home/card";
import RoomSearch from "~/components/home/search";
import { ToastConfigs } from "~/configs/toast";
import { getUser } from "~/hooks/useAuth";
import useDebounce from "~/hooks/useDebounce";
import { createBookingService } from "~/services/booking-services";
import { listRoomServices, SearchRoomService } from "~/services/roomServices";

export default function Home() {
  const [searchValue, setSearchValue] = useState();
  const [bookingStatus, setBookingStatus] = useState(null);
  const [dates, setDates] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listRoom, setListRoom] = useState();
  const [customerInfor, setCustomerInfor] = useState();
  const [detailRoom, setDetailRoom] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const { showToast } = ToastConfigs();

  const debounceValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const handleSearchRoom = async (q) => {
      try {
        const res = await SearchRoomService(q, bookingStatus?.code);
        setListRoom(res.Data);
        if (q || bookingStatus) {
          showToast({
            severity: "success",
            summary: "Successful",
            detail: "Rooms fetched successfully.",
          });
        }
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
    handleSearchRoom(debounceValue); // eslint-disable-next-line
  }, [debounceValue, bookingStatus]);

  const listRoomFunc = async () => {
    try {
      const res = await listRoomServices();
      setListRoom(res.Data);
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Fetch Failed",
        detail: error.response?.data?.Message || "Room is not found.",
      });
    }
  };

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
      message: "Are you sure you want to book this room?",
      header: "Booking Confirmation",
      icon: "pi pi-question-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-success",
      accept: handleBooking,
    });
  };

  return (
    <div className="p-5">
      <ConfirmDialog />
      <RoomSearch
        searchValue={searchValue}
        bookingStatus={bookingStatus}
        setSearchValue={setSearchValue}
        setBookingStatus={setBookingStatus}
      />

      <Dialog
        visible={isOpenModal}
        header="Room"
        onHide={() => {
          setIsOpenModal(false);
          setDates(null);
        }}
        className="w-[60%]"
        footer={
          <div className="flex justify-end gap-2 mt-4">
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

      <div className="grid grid-cols-5 place-items-center">
        {listRoom && listRoom.length > 0 ? (
          listRoom.map((room) => (
            <Card
              key={room.id}
              room={room}
              setDetailRoom={setDetailRoom}
              setIsOpenModal={setIsOpenModal}
              listRoomFunc={listRoomFunc}
            />
          ))
        ) : (
          <div className="col-span-5 flex flex-col items-center text-gray-500 mt-4">
            <i className="pi pi-exclamation-circle text-4xl text-gray-400 mb-2"></i>
            <p className="text-lg">No rooms available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
