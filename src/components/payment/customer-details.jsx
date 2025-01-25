import { formatDate } from "~/configs/dayjs";

export default function InforBlock({ detailBooking }) {
  return (
    <div className="border p-4 shadow rounded-lg h-[200px]">
      <h1 className="text-[28px] font-bold mb-2">Customer details</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Name</p>
          <p className="text-[#3838CA]">{detailBooking?.customer_name}</p>
        </div>
        <div>
          <p className="font-medium">Phone Number</p>
          <p className="text-[#3838CA]">{detailBooking?.customer_phone}</p>
        </div>
        <div>
          <p className="font-medium">E-mail</p>
          <p className="text-[#3838CA]">{detailBooking?.customer_email}</p>
        </div>
        <div>
          <p className="font-medium">Birthday</p>
          <p className="text-[#3838CA]">
            {formatDate(detailBooking?.customer_dob)}
          </p>
        </div>
      </div>
    </div>
  );
}
