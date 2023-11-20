import { ActiInterface } from "@/Interface/acti.interface";

class AppService {
  public getCurrentTime(): string {
    const year: number = new Date().getUTCFullYear();
    const month: number = new Date().getUTCMonth() + 1;
    const day: number = new Date().getUTCDate();
    return `${year}-${month}-${day}`;
  }

  public async getPlanning(
    protocol: string,
    host: string,
  ): Promise<ActiInterface[]> {
    const date: string = this.getCurrentTime();
    const url = `${protocol}//${host}/api/planning`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
      }),
    });

    const data = await response.json();
    if (response.status !== 200) throw new Error(data.message);
    return data;
  }
}

export default new AppService();
