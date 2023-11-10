import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!request) return NextResponse.error();
  const body = await request.json();
  const url = "https://intra.epitech.eu/user?format=json";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: "user=" + body.Cookie,
    },
  });

  const string = await response.json();
  if (string.message) {
    return NextResponse.error();
  }
  return NextResponse.json(string);
}
