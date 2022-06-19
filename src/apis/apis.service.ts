import { Injectable } from '@nestjs/common';
import { ListDto, CreateApiDto, UpdateApiDto } from './dto';
import { Api } from './entities/api.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApisService {
  constructor(
    @InjectRepository(Api)
    private readonly apiRepository: Repository<Api>,
  ) {}

  async create(createApiDto: CreateApiDto) {
    const api = new Api();
    api.name = createApiDto.name;
    api.url = createApiDto.url;
    api.custom = createApiDto.custom;
    api.components = createApiDto.components;

    return await this.apiRepository.save(api);
  }

  async findAll(listDto: ListDto) {
    const { page = 1, pageSize = 10, custom } = listDto;
    const where =
      custom === undefined
        ? { isDelete: false, custom: 0 }
        : { isDelete: false, custom };

    const getList = this.apiRepository
      .createQueryBuilder('api')
      .where(where)
      .select([
        'api.id',
        'api.name',
        'api.url',
        'api.custom',
        'api.components',
        'api.createTime',
        'api.updateTime',
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return await getList;
  }

  async findOne(id: number) {
    return await this.apiRepository
      .createQueryBuilder('api')
      .where('api.id=:id', { id })
      .select(['api.id', 'api.name', 'api.url', 'api.custom', 'api.components'])
      .getOne();
  }

  async update(id: number, updateApiDto: UpdateApiDto) {
    const updateApi = await this.apiRepository.findOneBy({ id });

    updateApi.name = updateApiDto.name;
    updateApi.url = updateApiDto.url;
    updateApi.custom = updateApiDto.custom;
    updateApi.components = updateApiDto.components;

    return this.apiRepository.save(updateApi);
  }

  async remove(id: number) {
    const removeApi = await this.apiRepository.findOneBy({ id });
    removeApi.isDelete = true;

    return this.apiRepository.save(removeApi);
  }
}
