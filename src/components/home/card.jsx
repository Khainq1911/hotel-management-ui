import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ToastConfigs } from "~/configs/toast";
import { updateRoomServices } from "~/services/roomServices";

export default function Card({
  key,
  room,
  setDetailRoom,
  setIsOpenModal,
  listRoomFunc,
}) {
  const navigate = useNavigate();
  const { showToast } = ToastConfigs();
  const handleUpdateCleanStatus = async () => {
    try {
      await updateRoomServices(room.id, {
        cleaning_status: !room.cleaning_status,
      });
      await listRoomFunc();
      showToast({
        severity: "success",
        summary: "Update Successful",
        detail: `Room cleaning status updated to ${
          room.cleaning_status ? "Dirty" : "Clean"
        }.`,
      });
    } catch (error) {
      console.error("Error updating room status:", error);
    }
  };
  return (
    <div
      key={key}
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
          <div className="flex justify-between items-center border-b pb-1">
            <span className="font-medium">Cleaning:</span>
            <Button
              onClick={() => {
                handleUpdateCleanStatus();
              }}
              severity={room.cleaning_status ? "success" : "danger"}
              outlined
            >
              {room.cleaning_status ? (
                <i className="pi pi-check"></i>
              ) : (
                <i className="pi pi-exclamation-triangle"></i>
              )}
            </Button>
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
              <i className="pi pi-dollar text-xs"></i> - {room.daily_price}
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
  );
}
