import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { FilmsRepositoryPSQL } from 'src/repository/filmsPSQL.repository';
import { OrderDTO, TicketDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly repository: FilmsRepositoryPSQL) {}

  async createOrder(
    order: OrderDTO,
  ): Promise<{ items: TicketDTO[]; total: number }> {
    const tickets = order.tickets;
    if (!tickets) throw new BadRequestException('нет билетов в заказе');

    for (const ticket of tickets) {
      const seat = `${ticket.row}:${ticket.seat}`;
      const film = await this.repository.findByID(ticket.film);
      if (!film) throw new NotFoundException('film не найден');
      const schedule = await this.repository.findSchedule(film.id);
      const session = schedule.find((item) => item.id === ticket.session);
      if (!session) throw new NotFoundException('сеанс не найден');

      await this.repository.addSeat(film.id, session.id, seat);
    }

    return { items: tickets, total: tickets.length };
  }
}
