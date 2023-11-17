"use client";
import { useEffect, useState } from "react";
import LOCATION from "@/final.location.json";
import Starfield from "@/Components/StarField";
import LoadingIndicator from "@/Components/LoadingIndicator";

function DrawDateProgress({
  start,
  end,
  isStarted,
}: {
  start: string;
  end: string;
  isStarted: boolean;
}) {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startDiff = now.getTime() - startDate.getTime();
  const endDiff = endDate.getTime() - startDate.getTime();
  const progress = (startDiff / endDiff) * 100;
  const style = {
    width: `${isStarted ? progress : 0}%`,
    height: "100%",
    backgroundColor: "black",
  };
  return (
    <div className="border-2 border-black rounded-md w-full mx-5 overflow-hidden">
      <div style={style}></div>
    </div>
  );
}

function DisplayRoom({ room, roomEvent }: { room: string; roomEvent: any[] }) {
  const isCurrentEvent = (event: any) => {
    const now = new Date();
    const start = new Date(event.start);
    const end = new Date(event.end);
    return now.getTime() >= start.getTime() && now.getTime() <= end.getTime();
  };

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
          <p className="text-center py-5 text-white">{event.acti_title}</p>
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

export default function Home() {
  const [eventList, setEventsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [roomList] = useState([...LOCATION]);

  async function fetchContent() {
    try {
      const host = window.location.host;
      const protocol = window.location.protocol;
      const url = `${protocol}//${host}/api/planning`;
      const year = new Date().getUTCFullYear();
      const month = new Date().getUTCMonth() + 1;
      const day = new Date().getUTCDate();
      const date = `${year}-${month}-${day}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
        }),
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        data.sort((a, b) => {
          const dateA = new Date(a.start);
          const dateB = new Date(b.start);
          return dateA.getTime() - dateB.getTime();
        });
        const now = new Date();
        const filtered = data.filter((e) => {
          const end = new Date(e.end);
          return now.getTime() <= end.getTime();
        });
        setEventsList(filtered);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
    }
  }

  useEffect(() => {
    fetchContent();
  }, []);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <h1>Error</h1>;

  function getRoomEvents(room: any) {
    return eventList.filter((e) => e.room?.code === room.key);
  }

  return (
    <div className="bg-black h-screen w-screen overflow-y-scroll">
      <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-3 gap-4 grid-flow-row">
        {roomList.map((e, index) => (
          <DisplayRoom
            key={index}
            room={e.title}
            roomEvent={getRoomEvents(e)}
          />
        ))}
      </div>
      <Starfield />
    </div>
  );
}
