import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import { useEffect, useState } from "react";
import RoomModal from "~/components/room-manage/room-modal";
import TyperoomModal from "~/components/room-manage/typeroom-modal";
import { ToastConfigs } from "~/configs/toast";
import { roomColumns, typeroomColumns } from "~/const/room";
import {
  listRoomServices,
  listTyperoomServices,
  updateTypeRoomServices,
} from "~/services/roomServices";

export default function RoomPage() {
  const [isRoom, setIsRoom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listRoom, setListRoom] = useState([]);
  const [listTyperoom, setListTyperoom] = useState([]);
  const [detailTyperoom, setDetailTyperoom] = useState(null);
  const { showToast } = ToastConfigs();
  const [typeroomForm, setTyperoomForm] = useState({});

  const handleChangeInputFunc = (e) => {
    setTyperoomForm({
      ...typeroomForm,
      [e.target.name]: e.target.value,
    });
  };

  const updateTyperoom = async () => {
    try {
      await updateTypeRoomServices(typeroomForm, detailTyperoom.id);
      await listTyperoomFunc();
      await listRoomFunc();
      showToast({
        severity: "success",
        summary: "Update Successful",
        detail: "Changes have been applied successfully.",
      });
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Update Failed",
        detail: error.response?.data?.Message || "An error occurred.",
      });
    }
  };

  const renderBookingStatus = (status) => {
    return (
      <div
        className={`px-4 py-1 rounded-full text-sm font-semibold shadow-md
        ${status ? "bg-red-500 text-white" : "bg-green-500 text-white"}
        transition-all duration-300 ease-in-out transform hover:scale-105`}
      >
        {status ? "Booked" : "Available"}
      </div>
    );
  };

  const renderCleaningStatus = (status) => {
    return (
      <div
        className={`px-4 py-1 rounded-full text-sm font-semibold shadow-md 
        ${status ? "bg-green-500 text-white" : "bg-yellow-500 text-gray-900"} 
        transition-all duration-300 ease-in-out transform hover:scale-105`}
      >
        {status ? "Clean" : "Dirty"}
      </div>
    );
  };

  const listRoomFunc = async () => {
    try {
      const res = await listRoomServices();
      setListRoom(
        res.Data.map((room) => ({
          name: room.name,
          floor: room.floor,
          description: room.description,
          daily_price: room.daily_price,
          hourly_price: room.hourly_price,
          booking_status: renderBookingStatus(room.booking_status),
          cleaning_status: renderCleaningStatus(room.cleaning_status),
        }))
      );
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

  const listTyperoomFunc = async () => {
    try {
      const res = await listTyperoomServices();
      setListTyperoom(res.Data);
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Fetch Failed",
        detail:
          error.response?.data?.Message ||
          "An error occurred while fetching type rooms.",
      });
    }
  };

  useEffect(() => {
    listRoomFunc();
    listTyperoomFunc(); // eslint-disable-next-line
  }, []);

  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setIsModalOpen(false)}
        severity="danger"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => {
          setIsModalOpen(false);
          updateTyperoom();
        }}
        autoFocus
        severity="success"
      />
    </div>
  );

  return (
    <div className="p-6">
      <Dialog
        footer={footerContent}
        visible={isModalOpen}
        header={detailTyperoom?.name}
        className="w-[300px]"
        onHide={() => setIsModalOpen(false)}
      >
        {!isRoom ? (
          <TyperoomModal
            detailTyperoom={detailTyperoom}
            handleChangeInputFunc={handleChangeInputFunc}
          />
        ) : (
          <RoomModal />
        )}
      </Dialog>

      <TabView>
        <TabPanel header="Rooms">
          <DataTable value={listRoom} tableStyle={{ minWidth: "50rem" }}>
            {roomColumns.map((col) => (
              <Column key={col.field} field={col.field} header={col.header} />
            ))}
            <Column field="booking_status" header="Booking Status" />
            <Column field="cleaning_status" header="Cleaning Status" />
          </DataTable>
        </TabPanel>

        <TabPanel header="Room Types">
          <DataTable value={listTyperoom} tableStyle={{ minWidth: "50rem" }}>
            {typeroomColumns.map((col) => (
              <Column key={col.field} field={col.field} header={col.header} />
            ))}
            <Column
              body={(rowData) => (
                <Button
                  onClick={() => {
                    setDetailTyperoom(rowData);
                    setIsModalOpen(true);
                    setIsRoom(false);
                  }}
                  outlined
                  severity="warning"
                >
                  Settings
                </Button>
              )}
              header="Actions"
            />
          </DataTable>
        </TabPanel>
      </TabView>
    </div>
  );
}
