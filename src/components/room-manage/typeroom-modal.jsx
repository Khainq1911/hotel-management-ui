import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";

export default function TyperoomModal({
  detailTyperoom,
  handleChangeInputFunc,
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center">
        <img
          src={detailTyperoom.img_url || "/placeholder-image.jpg"}
          alt={detailTyperoom.img_url ? "Typeroom image" : "Placeholder image"}
          className="rounded shadow-lg w-full h-[200px] object-cover"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:mt-5">
        <FloatLabel>
          <InputNumber
            required
            name="daily_price"
            value={detailTyperoom.daily_price}
            onValueChange={handleChangeInputFunc}
            className="w-full"
            min={1}
            placeholder="Enter daily price"
          />
          <label>Daily Price</label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            required
            name="hourly_price"
            value={detailTyperoom.hourly_price}
            onValueChange={handleChangeInputFunc}
            className="w-full"
            min={1}
            placeholder="Enter hourly price"
          />
          <label>Hourly Price</label>
        </FloatLabel>
      </div>
    </div>
  );
}
