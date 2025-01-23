import { Button } from "primereact/button";

export default function ServiceMenu({
  serviceItems,
  selectedItems,
  setSelectedItems,
}) {
  const handleAddItem = (addItem) => {
    const listItems = selectedItems.map((item) => item.name);
    if (listItems.includes(addItem.name)) {
      return;
    } else {
      setSelectedItems((prevItems) => [...prevItems, addItem]);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 ">
      {serviceItems.map((item) => {
        return (
          <div className="shadow border rounded">
            <img
              alt="Card"
              src={item.img_url}
              className="h-[80px] w-full object-cover rounded"
            />
            <div className="p-2 grid gap-2">
              <h1 className="font-semibold">{item.name}</h1>
              <p className="flex items-center ">
                <i className="pi pi-money-bill mr-1"></i>
                {item.price}VND
              </p>
              <Button
                label={<i className="pi pi-plus"></i>}
                onClick={() => {
                  handleAddItem(item);
                }}
                className="h-6"
                outlined
                severity="warning"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
