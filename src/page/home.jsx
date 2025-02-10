import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "~/components/booking/booking-form";
import { ToastConfigs } from "~/configs/toast";
import { getUser } from "~/hooks/useAuth";
import useDebounce from "~/hooks/useDebounce";
import { createBookingService } from "~/services/booking-services";
import { listRoomServices, SearchRoomService } from "~/services/roomServices";

export default function Home() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();
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
        const res = await SearchRoomService(q);
        setListRoom(res.Data);
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
  }, [debounceValue]);

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
    <div className="p-6">
      <FloatLabel className="mb-4 mt-2 ml-10">
        <InputText
          id="search_room"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label htmlFor="search_room">Search room</label>
      </FloatLabel>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 place-items-center">
        <ConfirmDialog />

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

        {listRoom?.map((room, i) => (
          <div
            key={i}
            className="w-[280px] bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={room.img_url}
                alt="Room"
                className="w-full h-[140px] object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold bg-gray-900 text-white rounded">
                {room.typeroom_name}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{room.name}</h3>

              <div className="text-sm space-y-1">
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Cleaning:</span>
                  <span
                    className={
                      room.cleaning_status ? "text-green-500" : "text-red-500"
                    }
                  >
                    {room.cleaning_status ? "Clean" : "Dirty"}
                  </span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium">Status:</span>
                  <span
                    className={
                      room.booking_status ? "text-red-500" : "text-green-500"
                    }
                  >
                    {room.booking_status ? "Booked" : "Available"}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-medium">Pricing:</span>
                  <span>
                    {room.hourly_price}
                    <i className="pi pi-dollar text-xs"></i> -{" "}
                    {room.daily_price}
                    <i className="pi pi-dollar text-xs"></i>
                  </span>
                </div>
              </div>

              <div className="mt-3">
                {room.booking_status ? (
                  <button
                    aria-label="Proceed to Payment"
                    className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium transition hover:bg-green-600"
                    onClick={() => navigate(`/payment/${room.id}`)}
                  >
                    Thanh toán
                  </button>
                ) : (
                  <button
                    aria-label="View Room Details"
                    className="w-full border border-green-500 text-green-500 py-2 rounded-lg text-sm font-medium transition hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setDetailRoom(room);
                      setIsOpenModal(true);
                    }}
                  >
                    View More
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
