import { Test, TestingModule } from '@nestjs/testing';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';

describe('PageController', () => {
  let controller: PageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageController],
      providers: [
        PageService,
        {
          provide: getRepositoryToken(Page),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<PageController>(PageController);
  });

  it('should be defined', function () {
    expect(controller).toBeDefined();
  });
});
