import { useState } from "react";
import { formatDate } from "~/configs/dayjs";
import UpdateScheduler from "./updateModal";
import { isAdmin } from "~/hooks/useAuth";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { UpdateSchedulerService } from "~/services/scheduler";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToastConfigs } from "~/configs/toast";

export default function DetailScheduler({
  selectedEvents,
  date,
  handleGetScheduler,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailEvent, setDetailEvent] = useState(null);

  const { showToast } = ToastConfigs();

  const handleCheckIn = async (event) => {
    try {
      const payload = {
        check_in: new Date().toISOString(),
        status: checkTime(event),
      };
      await UpdateSchedulerService(event?.id, payload);
      handleGetScheduler();
      showToast({
        severity: "success",
        summary: "Check-in Successful",
        detail: "Check-in successfully!",
      });
    } catch (error) {
      console.log(error);
      showToast({
        severity: "error",
        summary: "Check-in Failed",
        detail: "An error occurred while Checking-in.",
      });
    }
  };
  const checkTime = (event) => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const startTime = new Date(`${todayStr}T${event.start_time}`);
    const assignmentDate = new Date(event.assignment_date);

    if (
      formatDate(now, "YYYY-MM-DD") > formatDate(assignmentDate, "YYYY-MM-DD")
    ) {
      return "OVER TIME";
    } else if (
      formatDate(now, "YYYY-MM-DD") === formatDate(assignmentDate, "YYYY-MM-DD")
    ) {
      if (startTime.getTime() > now.getTime() - 30 * 60 * 1000) {
        return "ON TIME";
      } else if (
        startTime.getTime() < now.getTime() - 30 * 60 * 1000 &&
        startTime.getTime() > now.getTime() - 200 * 60 * 1000
      ) {
        return "LATE";
      } else {
        return "NOT READY";
      }
    } else {
      return "NOT READY";
    }
  };

  const confirmCheckIn = (event) => {
    confirmDialog({
      message: "Are you sure you want to check-in this shift?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => handleCheckIn(event),
    });
  };

  return (
    <div className="bg-[#2ECC71] w-[400px] text-white p-5 rounded-2xl shadow-lg font-sans">
      {isAdmin() && (
        <UpdateScheduler
          detailEvent={detailEvent}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleGetScheduler={handleGetScheduler}
        />
      )}
      <ConfirmDialog />
      <div className="text-center font-bold mb-4">
        <p className="text-[64px] leading-none">{formatDate(date, "DD")}</p>
        <p className="text-[24px]">{formatDate(date, "MMMM")}</p>
      </div>
      <p className="text-xl font-semibold uppercase tracking-wider border-b border-white/50 pb-2 mb-3">
        Work Schedule
      </p>
      {selectedEvents.length > 0 ? (
        <ul className="space-y-3">
          {selectedEvents.map((event, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-3 transition duration-300 ease-in-out  p-2 rounded bg-[#FAD02E]"
              onClick={() => {
                setDetailEvent(event);
              }}
            >
              <div>
                <p className="text-lg font-medium">
                  {event.start_time} - {event.end_time}
                </p>
                {isAdmin() ? (
                  <Tooltip target=".name" position="bottom" />
                ) : null}
                <p
                  className="name text-sm cursor-pointer hover:text-[gray] transition duration-200"
                  data-pr-tooltip="Change employee"
                  onClick={() => {
                    if (isAdmin()) {
                      setIsModalOpen(true);
                    }
                  }}
                >
                  {event.username}
                </p>
              </div>
              {event?.status ? (
                <div className="name bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                  <p>{event?.status}</p>
                  <p>{formatDate(event?.check_in, "HH:mm - DD/MM")}</p>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    confirmCheckIn(event);
                  }}
                  severity={
                    checkTime(event) === "OVER TIME"
                      ? "primary"
                      : "success"
                  }
                  disabled={
                    checkTime(event) === "NOT READY" ||
                    checkTime(event) === "OVER TIME"
                      ? true
                      : false
                  }
                >
                  {checkTime(event)}
                </Button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="italic opacity-80">No events scheduled for today</p>
      )}
    </div>
  );
}
