import { useState } from "react";
import { formatDate } from "~/configs/dayjs";
import UpdateScheduler from "./updateModal";
import { isAdmin } from "~/hooks/useAuth";

export default function DetailScheduler({
  selectedEvents,
  date,
  handleGetScheduler,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailEvent, setDetailEvent] = useState(null);
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
              className="flex items-center justify-between gap-3 transition duration-300 ease-in-out cursor-pointer p-1 rounded hover:bg-[#FAD02E]"
              onClick={() => {
                setDetailEvent(event);
                setIsModalOpen(true);
              }}
            >
              <div>
                <p className="text-lg font-medium">
                  {event.start_time} - {event.end_time}
                </p>
                <p className="text-sm">{event.username}</p>
              </div>
              {event?.status ? (
                <p className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                  {event?.status}
                </p>
              ) : undefined}
            </li>
          ))}
        </ul>
      ) : (
        <p className="italic opacity-80">No events scheduled for today</p>
      )}
    </div>
  );
}
