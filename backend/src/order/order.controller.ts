import { Controller, Post, Body } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  createOrder(@Body() order: OrderDTO) {
    return this.orderService.createOrder(order);
  }
}
