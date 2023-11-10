"use client";
import Starfield from "@/Components/StarField";
import Image from "next/image";
import someImage from "../../../public/Epitech.png";
import { Button, Input } from "@nextui-org/react";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const token = useRef("");
  const [loading, setLoading] = useState(false);
  const component = useMemo(() => <Starfield />, []);
  async function checkToken() {
    if (loading) return;
    setLoading(true);
    const host = window.location.host;
    const url = `https://${host}/api/user`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Cookie: token.current,
      }),
    });
    if (resp.status === 200) {
      router.push("/");
      localStorage.setItem("token", token.current);
    }
    setLoading(false);
  }

  return (
    <div>
      <div
        className="flex flex-col items-center justify-center h-screen"
        style={{ zIndex: 100 }}
      >
        <Image src={someImage} alt="Some text" className="w-1/3" />
        <Input
          type="text"
          label="Epitech Token"
          className="w-1/3 mt-5"
          onChange={(e) => (token.current = e.target.value)}
        />
        <Button
          color="primary"
          className="mt-5"
          onClick={checkToken}
          isLoading={loading}
        >
          Validate
        </Button>
      </div>
      {component}
    </div>
  );
}
