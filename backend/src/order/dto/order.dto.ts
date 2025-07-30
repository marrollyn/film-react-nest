//TODO реализовать DTO для /orders

export class TicketDTO {
  film: string;
  session: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderDTO {
  email: string;
  phone: string;
  tickets: TicketDTO[];
}

export class CreateOrderDto {
  filmId: string;
  userId: string;
  seats: string;
}
