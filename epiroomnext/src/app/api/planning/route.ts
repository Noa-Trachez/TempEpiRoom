import { NextResponse } from "next/server";
export async function POST(request: Request) {
  if (!request) return NextResponse.error();
  const body = await request.json();
  const date = new Date().toISOString().split("T")[0];
  const url =
    "https://intra.epitech.eu/planning/load?format=json&start=" +
    date +
    "&end=" +
    date;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: "user=" + body.Cookie,
    },
  });

  const string = await response.json();
  return NextResponse.json(string);
}
