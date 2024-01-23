import { NextResponse } from "next/server";
export async function POST(request: Request): Promise<Response> {
  if (!request) return NextResponse.error();
  const body = await request.json();
  const newDate = body.date;
  const url = "https://lille-epirooms.epitest.eu/?date=" + newDate;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const string = await response.json();

  return NextResponse.json(string);
}
