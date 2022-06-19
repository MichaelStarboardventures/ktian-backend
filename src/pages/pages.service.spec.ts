import { Test, TestingModule } from '@nestjs/testing';
import { PageService } from './page.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';

describe('PageService', () => {
  let service: PageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PageService,
        {
          provide: getRepositoryToken(Page),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PageService>(PageService);
  });

  it('should be defined', function () {
    expect(service).toBeDefined();
  });
});
