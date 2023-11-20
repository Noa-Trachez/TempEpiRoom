"use client";
import { useEffect, useState } from "react";
import LOCATION from "@/final.location.json";
import Starfield from "@/app/Components/StarField";
import LoadingIndicator from "@/app/Components/LoadingIndicator";
import AppService from "@/Service/AppService";
import DrawRoom from "@/app/Components/DrawRoom";
import Acti, { ActiInterface } from "@/Interface/acti.interface";
import LocationInterface from "@/Interface/location.interface";

export default function Home() {
  const [eventList, setEventsList] = useState<Acti[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [roomList] = useState<LocationInterface[]>([...LOCATION]);

  function computeRooms(data: ActiInterface[]) {
    // Map data to Acti
    const value = data.map((e) => {
      return new Acti(e);
    });

    // Sort by start date
    value.sort((a, b) => {
      const dateA = new Date(a.start);
      const dateB = new Date(b.start);
      return dateA.getTime() - dateB.getTime();
    });

    // Filter past events
    const now = new Date();
    const filtered = value.filter((e) => {
      const end = new Date(e.end);
      return now.getTime() <= end.getTime();
    });
    setEventsList(filtered);
  }

  async function fetchContent(): Promise<void> {
    try {
      const { protocol, host } = window.location;
      const data = await AppService.getPlanning(protocol, host);
      computeRooms(data);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchContent();
  }, []);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <h1>Error</h1>;

  function getRoomEvents(room: LocationInterface): Acti[] {
    return eventList.filter((e) => e.roomCode === room.key);
  }

  return (
    <div className="bg-black h-screen w-screen overflow-y-scroll">
      <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-3 gap-4 grid-flow-row">
        {roomList.map((e, index) => (
          <DrawRoom key={index} room={e.title} roomEvent={getRoomEvents(e)} />
        ))}
      </div>
      <Starfield />
    </div>
  );
}
