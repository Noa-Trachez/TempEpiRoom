import DrawDateProgress from "@/Components/DrawDateProgress";
import Acti from "@/Interface/acti.interface";
import "@/app/globals.css";

interface DrawRoomProps {
  room: string;
  roomEvent: Acti[];
}

const isCurrentEvent = (event: any) => {
  const now = new Date();
  const start = new Date(event.start);
  const end = new Date(event.end);
  return now.getTime() >= start.getTime() && now.getTime() <= end.getTime();
};

export default function DrawRoom({ room, roomEvent }: DrawRoomProps) {
  if (roomEvent.length === 0)
    return (
      <div
        style={{ backgroundColor: "#069C56" }}
        className="rounded-md m-2 p-5"
      >
        <h1 className="text-center font-bold text-white">{room}</h1>
      </div>
    );

  const event = roomEvent[0];
  const isCurrent = isCurrentEvent(event);
  const startString = event.start.split(" ")[1];
  const endString = event.end.split(" ")[1];

  return (
    <div
      style={{ backgroundColor: isCurrent ? "#D3212C" : "#FF980E" }}
      className="rounded-md m-2 p-5"
    >
      <h1 className="text-center font-bold text-white">{room}</h1>
      <div className="flex flex-col">
        <div className="flex flex-col w-full">
          <p className="text-center py-5 text-white">{event.title}</p>
          <div className="flex flex-row">
            <p className="text-white">{startString}</p>
            <DrawDateProgress
              start={event.start}
              end={event.end}
              isStarted={isCurrent}
            />
            <p className="text-white">{endString}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
