import { Test, TestingModule } from '@nestjs/testing';
import { ApisController } from './apis.controller';
import { ApisService } from './apis.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Api } from './entities/api.entity';

describe('ApisController', () => {
  let controller: ApisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApisController],
      providers: [
        ApisService,
        {
          provide: getRepositoryToken(Api),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ApisController>(ApisController);
  });

  it('should be defined', function () {
    expect(controller).toBeDefined();
  });
});
