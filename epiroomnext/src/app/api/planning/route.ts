import { NextResponse } from "next/server";
export async function POST(request: Request): Promise<Response> {
  if (!request) return NextResponse.error();
  const body = await request.json();
  const newDate = body.date;
  const url =
    "https://intra.epitech.eu/planning/load?format=json&start=" +
    newDate +
    "&end=" +
    newDate;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: "user=" + process.env.EPITECH_COOKIE,
    },
  });

  const string = await response.json();
  return NextResponse.json(string);
}
