import { Test, TestingModule } from '@nestjs/testing';
import { ApisService } from './apis.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Api } from './entities/api.entity';

describe('ApisService', () => {
  let service: ApisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApisService,
        {
          provide: getRepositoryToken(Api),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ApisService>(ApisService);
  });

  it('should be defined', function () {
    expect(service).toBeDefined();
  });
});
