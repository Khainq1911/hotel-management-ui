import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useCallback, useEffect, useState } from "react";
import ServiceMenu from "./service-menu";
import { listitemsService } from "~/services/service";
import ServiceBill from "./service-bill";
import { Divider } from "primereact/divider";

export default function Services({confirmedItems, setConfirmedItems}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [serviceItems, setServiceItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderNumber, setOrderNumber] = useState([]);
 

  const handleListItems = useCallback(async () => {
    try {
      const res = await listitemsService();
      setOrderNumber(res.Data.map((item) => ({ name: item.name, number: 0 })));
      setServiceItems(res.Data);
    } catch (error) {}
  }, [setServiceItems]);

  useEffect(() => {
    handleListItems();
  }, [handleListItems]);

  const handleConfirm = (items, totalPrice) => {
    setConfirmedItems({ items, totalPrice }); 
    setIsOpenModal(false); 
  };

  return (
    <div className="border rounded-lg shadow p-4 ">
      <Dialog
        header="Services"
        onHide={() => setIsOpenModal(false)}
        visible={isOpenModal}
      >
        <div className="flex">
          <ServiceMenu
            serviceItems={serviceItems}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
          <Divider layout="vertical" />
          <ServiceBill
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
            onConfirm={handleConfirm} 
          />
        </div>
      </Dialog>
      <Button outlined onClick={() => setIsOpenModal(true)}>
        <i className="pi pi-plus-circle mr-2"></i> Add service
      </Button>

      {confirmedItems.items && (
        <div className="mt-4">
          {confirmedItems.items.map((item, index) => {  
            const quantity = orderNumber.find(o => o.name === item.name)?.number || 1;
            return (
              <div key={index} className="flex justify-between items-center mb-2">
                <img
                  alt={item.name}
                  src={item.img_url}
                  className="w-[80px] h-[80px] object-cover rounded-lg"
                />
                <div>
                  <span className="font-bold">{item.name}</span>
                  <div>{item.price.toLocaleString()} VND</div>
                  <div>Quantity: {quantity}</div>
                </div>
              </div>
            );
          })}
          <div className="font-bold mt-2">
            Total: {confirmedItems.totalPrice.toLocaleString()} VND
          </div>
        </div>
      )}
    </div>
  );
}
