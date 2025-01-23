import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function ServiceBill({
  selectedItems,
  setSelectedItems,
  orderNumber,
  setOrderNumber,
  onConfirm, 
}) {
  const totalPrice = orderNumber.reduce((total, item) => {
    const quantity = item.number || 1;
    const price = selectedItems.find((p) => p.name === item.name)?.price || 0;
    return total + price * quantity;
  }, 0);

  return (
    <div className="w-[300px]">
      <div className="border rounded-lg shadow p-2 h-[380px] overflow-y-scroll">
        {selectedItems.length !== 0
          ? selectedItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <img
                  alt="service"
                  src={item.img_url}
                  className="w-[80px] h-[80px] object-cover rounded-lg"
                />
                <div>
                  <div className="border px-2 rounded shadow w-[180px] h-[80px]">
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold">{item.name}</h1>
                      <i
                        className="pi pi-times-circle"
                        style={{ fontWeight: 800 }}
                        onClick={() =>
                          setSelectedItems((prev) =>
                            prev.filter((p) => p.name !== item.name)
                          )
                        }
                      ></i>
                    </div>
                    <div className="grid">
                      <p className="flex items-center">
                        <i className="pi pi-money-bill mr-1"></i>
                        {item.price.toLocaleString()} VND
                      </p>
                      <InputText
                        className="w-[60px] h-6"
                        type="number"
                        min={1}
                        value={
                          orderNumber.find((o) => o.name === item.name)
                            ?.number || 1
                        }
                        onChange={(e) => {
                          const newValue = Math.max(1, parseInt(e.target.value));
                          setOrderNumber((prev) =>
                            prev.map((o) =>
                              o.name === item.name
                                ? { ...o, number: newValue }
                                : o
                            )
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : "No items selected"}
      </div>
      <div className="mt-4 font-bold flex items-center justify-between">
        <span>Total: {totalPrice.toLocaleString()} VND</span>
        <Button
          label="Confirm"
          severity="warning"
          outlined
          onClick={() => onConfirm(selectedItems, totalPrice)}
        />
      </div>
    </div>
  );
}
