import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

export default function BookingDetail() {
  return (
    <div className="w-full max-w-[350px] rounded-lg px-2">
      <img
        alt="Room Image"
        src="https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?cs=srgb&dl=pexels-fotoaibe-1669799.jpg&fm=jpg"
        className="shadow rounded-lg w-full h-[150px] object-cover"
      />
      <div className="mt-4">
        <p className="text-[24px] font-bold">Phong 101</p>
        <p className="text-[14px] my-2">Deluxury room</p>
        <div className="flex items-center">
          <i className="pi pi-money-bill mr-2" style={{ fontSize: 16 }}></i>
          <p className="text text-[#06B6D4] font-bold">
            2000 VND <span>| </span>
            20 VND
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <i className="pi pi-users mr-2" style={{ fontSize: 16 }}></i>
            <p className="text">4 - 6</p>
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
        <h1 className="text-[24px] font-bold mb-2">Detail price</h1>
        <div className="flex justify-between">
          <p>Booking price:</p>
          <strong>VND 20000</strong>
        </div>
        <div className="flex justify-between">
          <p>Service price:</p>
          <strong>VND 20000</strong>
        </div>
        <div className="flex justify-between">
          <p>Discount:</p>
          <strong>-VND 20000</strong>
        </div>
        <Divider />
        <div className="flex justify-between">
          <p>Total:</p>
          <strong>-VND 20000</strong>
        </div>
        <Button label="Confirm and Pay 20000VND" className="w-full mt-4" severity="warning" outlined/>
      </div>
    </div>
  );
}
