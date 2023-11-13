import { NextResponse } from "next/server";
export async function GET(request: Request) {
  if (!request) return NextResponse.error();
  let newDate = new Date().toLocaleString("fr-EU", {
    timeZone: "Europe/Paris",
  });
  newDate = newDate.split(" ")[0];
  newDate = newDate.split("/").reverse().join("-");
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
