interface ActiInterface {
  id: number;
  id_calendar: number;
  calendar_type: string;
  weeks_left: number;
  type: string;
  location: string;
  type_room: string;
  title: string;
  has_to_rate: boolean;
  event_registered: null;
  registered: number;
  rating_event: null;
  start: string;
  end: string;
  description: string;
  nb_place: number;
  color: string;
  confirm_owner: boolean;
  confirm_maker: boolean;
  id_owner: number;
  id_maker: number;
  duration: string;
  rights: { planning_visible: number };
  nb_rated: number;
  owner: { login: string; title: string; picture: string };
  maker: { login: string; title: string; picture: string };
  room: {
    code: string;
    type: string;
    seats: number;
  };
}

class Acti {
  id: number;
  end: string;
  start: string;
  title: string;
  roomCode: string;
  public constructor(_acti: ActiInterface) {
    this.id = _acti.id;
    this.end = _acti.end;
    this.start = _acti.start;
    this.title = _acti.title;
    this.roomCode = _acti?.room?.code;
  }
}

export default Acti;
export type { ActiInterface };
