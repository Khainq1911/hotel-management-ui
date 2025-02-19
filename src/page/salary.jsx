import { useEffect, useState } from "react";
import ListPayroll from "~/components/payroll/listPayroll";

import Search from "~/components/payroll/search";
import { formatDate } from "~/configs/dayjs";
import { listPayroll } from "~/services/payroll";

export default function SalaryPage() {
  const [dates, setDates] = useState(null);
  const [listPayrolls, setListPayrolls] = useState(null);
  const handleGetPayroll = async () => {
    try {
      const res = await listPayroll();
      setListPayrolls(
        res.Data.map((payroll) => ({
          ...payroll,
          pay_period_start: formatDate(payroll.pay_period_start, "DD-MM-YYYY"),
          pay_period_end: formatDate(payroll.pay_period_end, "DD-MM-YYYY"),
          payment_date: formatDate(
            payroll.payment_date,
            "DD MMM, YYYY - HH:mm "
          ),
        }))
      );
    } catch (error) {}
  };
  useEffect(() => {
    handleGetPayroll();
  }, []);
  return (
    <div className="p-5">
      <Search dates={dates} setDates={setDates} />
      <ListPayroll
        listPayrolls={listPayrolls}
        handleGetPayroll={handleGetPayroll}
      />
    </div>
  );
}
