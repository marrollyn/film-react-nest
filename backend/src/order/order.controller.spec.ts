import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('OrderController', () => {
  let orderController: OrderController;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  const mockOrder: OrderDTO = {
    email: 'email@email.ru',
    phone: '+79999999999',
    tickets: [
      {
        film: '64145bb0-996a-4644-b351-af6dc1266514',
        session: '373452c8-e4c6-450a-a2ca-30d46a27e81e',
        daytime: '2023-05-29T10:30:00.001Z',
        day: '2023-05-29',
        time: '10:30',
        row: 1,
        seat: 1,
        price: 350,
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    orderController = module.get<OrderController>(OrderController);
  });

  it('createOrder() resolve', async () => {
    mockOrderService.createOrder.mockResolvedValue({
      total: 1,
      items: mockOrder.tickets,
    });
    const result = await orderController.createOrder(mockOrder);

    expect(result).toEqual({
      total: 1,
      items: mockOrder.tickets,
    });

    expect(mockOrderService.createOrder).toHaveBeenCalledWith(mockOrder);
  });

  it('createOrder() BadRequestException (нет билетов)', async () => {
    mockOrderService.createOrder.mockRejectedValue(
      new BadRequestException('нет билетов в заказе'),
    );

    await expect(
      orderController.createOrder({ ...mockOrder, tickets: [] }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(mockOrderService.createOrder).toHaveBeenCalled();
  });

  it('createOrder() NotFoundException (film/сеанс не найден)', async () => {
    mockOrderService.createOrder.mockRejectedValue(
      new NotFoundException('film/сеанс не найден'),
    );

    await expect(orderController.createOrder(mockOrder)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(mockOrderService.createOrder).toHaveBeenCalledWith(mockOrder);
  });
});
