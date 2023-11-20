import { CSSProperties } from "react";

interface DrawDateProgressProps {
  start: string;
  end: string;
  isStarted: boolean;
}
export default function DrawDateProgress({
  start,
  end,
  isStarted,
}: DrawDateProgressProps) {
  const now: Date = new Date();
  const startDate: Date = new Date(start);
  const endDate: Date = new Date(end);
  const startDiff: number = now.getTime() - startDate.getTime();
  const endDiff: number = endDate.getTime() - startDate.getTime();
  const progress: number = (startDiff / endDiff) * 100;

  const style: CSSProperties = {
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
