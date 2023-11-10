import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingIndicator from "@/Components/LoadingIndicator";
export default function RouteGuards({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  async function checkToken(token: string) {
    const host = window.location.host;
    const url = `https://${host}/api/user`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Cookie: token,
      }),
    });
    if (resp.status === 200) {
      router.push("/");
    } else {
      localStorage.removeItem("token");
      router.push("/pages");
    }
  }

  async function routeGuard() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/pages");
    } else {
      await checkToken(token);
    }
    setIsLoaded(true);
  }

  useEffect(() => {
    routeGuard();
  }, []);

  if (!isLoaded) return <LoadingIndicator />;

  return <>{children}</>;
}
