import { Injectable } from '@nestjs/common';
import { CreateComponentDto, ListDto, UpdateComponentDto } from './dto';
import { Component } from './entities/component.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>,
  ) {}

  async create(createComponentDto: CreateComponentDto) {
    const createComponent = new Component();
    createComponent.name = createComponentDto.name;
    createComponent.type = createComponentDto.type;

    return await this.componentRepository.save(createComponent);
  }

  async findAll(listDto: ListDto) {
    const { page = 1, pageSize = 10 } = listDto;

    const getList = this.componentRepository
      .createQueryBuilder('component')
      .where({ isDelete: 'false' })
      .select([
        'component.id',
        'component.name',
        'component.type',
        'component.createTime',
        'component.updateTime',
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return await getList;
  }

  async findOne(id: number) {
    return await this.componentRepository
      .createQueryBuilder('component')
      .where('component.id=:id', { id })
      .select([
        'component.id',
        'component.name',
        'component.type',
        'component.createTime',
        'component.updateTime',
      ])
      .getOne();
  }

  async update(id: number, updateComponentDto: UpdateComponentDto) {
    const updateComponent = await this.componentRepository.findOneBy({ id });
    updateComponent.name = updateComponentDto.name;
    updateComponent.type = updateComponentDto.type;

    return this.componentRepository.save(updateComponent);
  }

  async remove(id: number) {
    const deleteComponent = await this.componentRepository.findOneBy({ id });
    deleteComponent.isDelete = true;

    return this.componentRepository.save(deleteComponent);
  }
}
