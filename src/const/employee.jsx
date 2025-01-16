import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

export const columns = [
  { field: "id", header: "Mã nhân viên" },
  { field: "username", header: "Họ và tên" },
  { field: "phone", header: "Số điện thoại" },
  { field: "email", header: "Email" },
  { field: "position", header: "Chức vụ" },
  { field: "salary", header: "Mức Lương" },
];

export const headerModalItems = [
  { label: "Profile", icon: "pi pi-home" },
  { label: "Transactions", icon: "pi pi-chart-line" },
  { label: "Products", icon: "pi pi-list" },
  { label: "Messages", icon: "pi pi-inbox" },
];
export const updateFormField = [
  { label: "Username", code: "username", isNum: false },
  { label: "Age", code: "age", isNum: true },
  { label: "Address", code: "address", isNum: false },
  { label: "Birthday", code: "dob", isNum: false },
  { label: "Phone", code: "phone", isNum: false },
  { label: "Position", code: "position", isNum: false },
  { label: "Salary", code: "salary", isNum: true },
  { label: "Hired Date", code: "hired_date", isNum: false },
];

export const InputData = ({
  label,
  value,
  bool,
  code,
  handleChange,
  isNum,
}) => {
  return (
    <>
      {!bool ? (
        <div>
          <p>{label}</p> <p className="text-[#49A3AD]">{value}</p>
        </div>
      ) : (
        <FloatLabel className="mb-4">
          {isNum ? (
            <InputNumber name={code} value={value} onValueChange={handleChange} />
          ) : (
            <InputText name={code} value={value} onChange={handleChange} />
          )}
          <label>{label}</label>
        </FloatLabel>
      )}
    </>
  );
};
