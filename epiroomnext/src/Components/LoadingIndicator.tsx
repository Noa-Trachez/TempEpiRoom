import { Spinner } from "@nextui-org/react";

export default function LoadingIndicator() {
  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
      <Spinner size="lg" color="primary" labelColor="primary" />
    </div>
  );
}
