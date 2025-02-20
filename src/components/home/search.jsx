import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";


export default function RoomSearch({
  searchValue,
  setSearchValue,
  bookingStatus,
  setBookingStatus,
}) {
  const BookingStatus = [
    { name: "Available", code: true },
    { name: "Booked", code: false },
  ];
  return (
    <div className="grid grid-cols-5 place-items-center mb-4 ">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search"> </InputIcon>
        <InputText
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className=" w-[280px]"
        />
      </IconField>
      <Dropdown
        value={bookingStatus}
        onChange={(e) => setBookingStatus(e.value)}
        options={BookingStatus}
        optionLabel="name"
        placeholder="Booking Status"
        className=" w-[240px]"
        checkmark={true}
        highlightOnSelect={false}
        showClear
      />
    </div>
  );
}
