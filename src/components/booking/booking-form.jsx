import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { useEffect, useMemo, useState } from "react";
import { ToastConfigs } from "~/configs/toast";
import useDebounce from "~/hooks/useDebounce";
import {
  checkExitsCustomer,
  createCustomerService,
} from "~/services/customer-services";

export default function BookingForm({
  detailRoom,
  dates,
  setDates,
  customerInfor,
  setCustomerInfor,
  setTotalPrice,
}) {
  const [customerForm, setCustomerForm] = useState();
  const [bookingType, setBookingType] = useState("day");
  const [totalDate, setTotalDate] = useState();
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const debouncedSearchInput = useDebounce(searchInput, 1000);
  const { showToast } = ToastConfigs();

  const totalPriceFunc = useMemo(() => {
    const basePrice = detailRoom.daily_price;
    const discount = 0;
    setTotalPrice(totalDate * basePrice - discount || 0);
    return totalDate * basePrice - discount || 0;
  }, [totalDate, detailRoom.daily_price, setTotalPrice]);

  const handleInputChange = (e) => {
    setCustomerForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      await createCustomerService(customerForm);
      setSearchInput(customerForm.phone);
      showToast({
        severity: "success",
        summary: "Customer Created",
        detail: "Customer information saved successfully.",
      });
    } catch {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Failed to create customer.",
      });
    }
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const res = await checkExitsCustomer(debouncedSearchInput);
        setCustomerInfor(res);
        setIsExistingCustomer(res.exists);
        if (debouncedSearchInput) {
          showToast({
            severity: res.exists ? "success" : "error",
            summary: res.exists ? "Customer Found" : "Customer Not Found",
            detail: res.exists
              ? "Customer information retrieved successfully."
              : "No customer found with the provided information.",
          });
        }
      } catch {
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch customer information.",
        });
      }
    };
    fetchCustomerData(debouncedSearchInput); // eslint-disable-next-line
  }, [debouncedSearchInput]);
  useEffect(() => {
    if (dates && dates[0] && dates[1]) {
      setTotalDate(
        Math.round(
          (new Date(dates[1]).getTime() - new Date(dates[0]).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );
    }
  }, [dates]);

  return (
    <div className="flex bg-[#F6F8FA] shadow p-2 rounded-lg">
      <div className="w-full max-w-[350px]">
        <img
          src={detailRoom.img_url}
          alt={detailRoom.name || "Room Image"}
          className="shadow rounded-lg w-full h-[150px] object-cover"
        />
        <div className="w-full h-[140px] border rounded-lg p-2 mt-4">
          <p className="text-[24px] font-bold">{detailRoom.name}</p>
          <p className="text-[14px] my-2">{detailRoom.typeroom_name}</p>
          <div className="flex items-center">
            <i className="pi pi-money-bill mr-2" style={{ fontSize: 16 }}></i>
            <p className="text text-[#06B6D4] font-bold">
              {detailRoom.daily_price} VND <span>| </span>
              {detailRoom.hourly_price} VND
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <i className="pi pi-users mr-2" style={{ fontSize: 16 }}></i>
              <p className="text">
                {detailRoom.standard_capacity} - {detailRoom.max_capacity}
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
        <div className="border rounded-lg mt-4 p-2 grid grid-cols-1">
          {bookingType === "day" ? (
            <FloatLabel className="mt-4 mb-4">
              <Calendar
                inputId="date"
                className="w-[280px]"
                value={dates}
                selectionMode="range"
                onChange={(e) => setDates(e.value)}
                showIcon
                showButtonBar
                onClearButtonClick={() => {
                  setTotalDate(0);
                }}
                aria-label="Check-in and Check-out dates"
              />
              <label htmlFor="date">Check-in date - Check-out date</label>
            </FloatLabel>
          ) : (
            <p>Feature not updated</p>
          )}
          <div className="flex justify-between">
            <strong>Booking type:</strong>
            <div className="flex items-center">
              <RadioButton
                inputId="day"
                name="bookingType"
                value="day"
                onChange={(e) => setBookingType(e.value)}
                checked={bookingType === "day"}
              />
              <label htmlFor="day" className="ml-2">
                By Day
              </label>
            </div>
            <div className="flex items-center">
              <RadioButton
                inputId="hour"
                name="bookingType"
                value="hour"
                onChange={(e) => setBookingType(e.value)}
                checked={bookingType === "hour"}
              />
              <label htmlFor="hour" className="ml-2">
                By Hour
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* user block */}
      <div className="w-full ml-4">
        <div className="border rounded-lg px-2 py-3">
          <h1 className="text-[20px] font-bold">Your details</h1>

          <div className="my-2">
            <label htmlFor="find" className="font-medium mr-2 ">
              Find Customer:
            </label>
            <InputText
              id="find"
              aria-describedby="find-help"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className="border rounded-lg p-2 mt-4">
          {!isExistingCustomer ? (
            <form onSubmit={handleCreateCustomer}>
              <h1 className="text-[20px] font-bold">Create customer</h1>
              <p className="text-center my-1 text-[12px]">
                Customer not found, please search or create a new customer
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <label htmlFor="username" className="font-medium">
                    Username
                  </label>
                  <InputText
                    name="name"
                    required={true}
                    aria-describedby="username-help"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <InputText
                    name="email"
                    required={true}
                    aria-describedby="email-help"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="phone" className="font-medium">
                    Phone number
                  </label>
                  <InputText
                    name="phone"
                    required={true}
                    aria-describedby="phone-help"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="birthday" className="font-medium">
                    Birthday
                  </label>
                  <Calendar
                    name="dob"
                    required={true}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button type="submit" label="Create" className="mt-4" outlined />
            </form>
          ) : (
            <div className="grid grid-cols-2">
              <div>
                <label htmlFor="name" className="font-medium mr-2">
                  Name:
                </label>
                <InputText
                  value={customerInfor?.name}
                  id="name"
                  aria-describedby="name-help"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-medium mr-2">
                  Email:
                </label>
                <InputText
                  value={customerInfor?.email}
                  id="email"
                  aria-describedby="email-help"
                />
              </div>
            </div>
          )}
        </div>
        <div className="border rounded-lg mt-4 p-2">
          <h1 className="text-[20px] font-bold">Your booking details</h1>

          <div className="flex">
            <div>
              <div className="flex my-2">
                <div>
                  <label className="font-medium">Check in</label>
                  <p className="font-bold">
                    {dates && dates[0] ? dates[0].toLocaleDateString() : ""}
                  </p>
                </div>
                <Divider layout="vertical" />
                <div>
                  <label className="font-medium">Check out</label>
                  <p className="font-bold">
                    {dates && dates[1] ? dates[1].toLocaleDateString() : ""}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-medium">Total length of stay:</p>
                <p className="font-bold">
                  {dates && dates[0] && dates[1] ? `${totalDate} days` : ""}
                </p>
              </div>
            </div>
            <Divider layout="vertical" />
            <div>
              <div className="mt-2 grid grid-cols-2 ">
                <p>Origin price:</p>
                <p className="ml-2">
                  VND {totalDate * detailRoom.daily_price || ""}
                </p>
              </div>
              <div className="mt-2 grid grid-cols-2 ">
                <p>Discount:</p>
                <p className="ml-2">VND 0</p>
              </div>

              <div className="mt-2 grid grid-cols-2 ">
                <p className="font-medium">Total:</p>
                <p className="ml-2 font-bold  ">VND {totalPriceFunc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
