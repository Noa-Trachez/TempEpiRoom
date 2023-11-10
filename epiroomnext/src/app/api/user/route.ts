import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (!request) return NextResponse.error();
  const url = "https://intra.epitech.eu/user?format=json";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: "user=" + process.env.EPITECH_COOKIE,
    },
  });

  const string = await response.json();
  if (string.message) {
    return NextResponse.error();
  }
  return NextResponse.json(string);
}
