import { useEffect, useState } from "react";
import { getScheduler, getSchedulerById } from "~/services/scheduler";
import { Calendar } from "primereact/calendar";
import { Badge } from "primereact/badge";
import { formatDate } from "~/configs/dayjs";
import { Button } from "primereact/button";
import DetailScheduler from "~/components/scheduler/detailScheduler";
import "~/page/scheduler/scheduler.css";
import { getUser, isAdmin } from "~/hooks/useAuth";

const SchedulerPage = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(formatDate(new Date(), "YYYY-MM-DD"));
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleChangeDay = (selectedDate) => {
    const filteredEvents = events.filter(
      (event) =>
        formatDate(event.assignment_date, "YYYY-MM-DD") ===
        formatDate(selectedDate, "YYYY-MM-DD")
    );

    setSelectedEvents(filteredEvents);
  };

  const handleGetScheduler = async () => {
    try {
      if (isAdmin()) {
        const res = await getScheduler();
        setEvents(res.Data);
        const filteredEvents = res.Data.filter(
          (event) =>
            formatDate(event.assignment_date, "YYYY-MM-DD") ===
            formatDate(date, "YYYY-MM-DD")
        );

        setSelectedEvents(filteredEvents);
      } else {
        const EmployeeId = getUser().id;
        const res = await getSchedulerById(EmployeeId);
        console.log(res.Data);
        setEvents(res.Data);
      }
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  };

  useEffect(() => {
    handleGetScheduler(); // eslint-disable-next-line
  }, []);

  return (
    <div className="p-5">
      <div>
        <Button label="Add shift" />
        <Button label="Import excel" severity="success" className="ml-2" />
      </div>
      <div className="flex justify-between shadow-xl rounded-3xl max-w-[800px] mx-auto mt-10 overflow-hidden">
        <DetailScheduler
          selectedEvents={selectedEvents}
          date={date}
          handleGetScheduler={handleGetScheduler}
        />
        <Calendar
          className="no-border-calendar p-5"
          value={date}
          onChange={(e) => {
            setDate(e.value);
            handleChangeDay(e.value);
          }}
          inline
          dateTemplate={(currentDate) => {
            const formattedCurrentDate = new Date(
              currentDate.year,
              currentDate.month,
              currentDate.day
            );

            const hasEvent = events.some(
              (event) =>
                formatDate(event.assignment_date, "YYYY-MM-DD") ===
                formatDate(formattedCurrentDate, "YYYY-MM-DD")
            );

            return (
              <div className="flex flex-col items-center relative">
                {hasEvent && (
                  <Badge
                    severity="success"
                    className="absolute bottom-[-6px]"
                  />
                )}
                <span>{currentDate.day}</span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default SchedulerPage;
