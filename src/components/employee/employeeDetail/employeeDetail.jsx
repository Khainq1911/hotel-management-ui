import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import Profile from "./profile";

export default function EmployeeDetail({
  isOpenDialog,
  setIsOpenDialog,
  detailEmployee,
  handleListEmployee,
}) {
  return (
    <div>
      <Dialog
        resizable={false}
        visible={isOpenDialog}
        onHide={() => {
          setIsOpenDialog(false);
        }}
        className="w-[600px]"
        header="Employee Detail"
      >
        <TabView>
          <TabPanel header="Profile">
            <Profile
              detailEmployee={detailEmployee}
              handleListEmployee={handleListEmployee}
            />
          </TabPanel>
          <TabPanel header="Salary History">Tien</TabPanel>
        </TabView>
      </Dialog>
    </div>
  );
}
