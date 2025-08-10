import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmDTO } from './dto/film.dto';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

describe('FilmController', () => {
  let filmsController: FilmsController;

  const mockFilms: FilmDTO[] = [
    {
      id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      rating: 2.9,
      director: 'Итан Райт',
      tags: ['Документальный'],
      image: '/bg1s.jpg',
      cover: '/bg1c.jpg',
      title: 'Архитекторы общества',
      about: 'Документальный фильм, исследующий...',
      description: 'Документальный фильм Итана Райта...',
      schedule: [
        {
          id: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
          daytime: '2024-06-28T10:00:53+03:00',
          hall: 0,
          rows: 5,
          seats: 10,
          price: 350,
          taken: [],
        },
      ],
    },
    {
      id: '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
      rating: 9,
      director: 'Харрисон Рид',
      tags: ['Рекомендуемые'],
      image: '/bg3s.jpg',
      cover: '/bg3c.jpg',
      title: 'Недостижимая утопия',
      about: 'Провокационный фильм-антиутопия...',
      description:
        'Провокационный фильм-антиутопия режиссера Харрисона Рида...',
      schedule: [
        {
          id: '9647fcf2-d0fa-4e69-ad90-2b23cff15449',
          daytime: '2024-06-28T10:00:53+03:00',
          hall: 0,
          rows: 5,
          seats: 10,
          price: 350,
          taken: [],
        },
      ],
    },
  ];
  const mockID = '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf';
  const mockSchedule = mockFilms[0].schedule;

  const mockFilmsService = {
    findAll: jest.fn(),
    findByID: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue(mockFilmsService)
      .compile();

    filmsController = module.get<FilmsController>(FilmsController);
  });

  it('.findAll() should call findAll method of the service', async () => {
    mockFilmsService.findAll.mockResolvedValue({
      total: mockFilms.length,
      items: mockFilms,
    });
    const result = await filmsController.findAll();

    expect(result).toEqual({
      total: mockFilms.length,
      items: mockFilms,
    });

    expect(mockFilmsService.findAll).toHaveBeenCalled();
  });

  it('findByID() resolve', async () => {
    mockFilmsService.findByID.mockResolvedValue({
      total: 1,
      items: mockSchedule,
    });
    const result = await filmsController.findByID(mockID);

    expect(result).toEqual({
      total: 1,
      items: mockSchedule,
    });

    expect(mockFilmsService.findByID).toHaveBeenCalledWith(mockID);
  });

  it('findByID() reject', async () => {
    const fakeID = 'x';
    mockFilmsService.findByID.mockRejectedValue(
      new NotFoundException('фильм не найден'),
    );
    await expect(filmsController.findByID(fakeID)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(mockFilmsService.findByID).toHaveBeenCalledWith(fakeID);
  });
});
