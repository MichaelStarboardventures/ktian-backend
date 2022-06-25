import { Injectable } from '@nestjs/common';
import { CreateRouteDto, ListDto, UpdateRouteDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './entities/route.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}
  async validMainPage() {
    const route = await this.routeRepository
      .createQueryBuilder('route')
      .where('route.mainPage=:mainPage', { mainPage: 1 })
      .select(['route.mainPage', 'route.id'])
      .getOne();

    if (!route) return;

    route.mainPage = 0;

    await this.routeRepository.save(route);
  }

  async create(createRouteDto: CreateRouteDto) {
    const createRoute = new Route();
    createRoute.routes = JSON.stringify(createRouteDto.routes);
    createRoute.mainPage = createRouteDto.mainPage;
    createRoute.name = createRouteDto.name;

    if (createRoute.mainPage) await this.validMainPage();

    return await this.routeRepository.save(createRoute);
  }

  async findAll(listDto: ListDto) {
    const { page = 1, pageSize = 20, mainPage } = listDto;

    const where = mainPage
      ? { isDelete: false, mainPage }
      : { isDelete: false };

    const getList = this.routeRepository
      .createQueryBuilder('route')
      .where(where)
      .select([
        'route.id',
        'route.routes',
        'route.name',
        'route.mainPage',
        'route.createTime',
        'route.updateTime',
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return await getList;
  }

  async findOne(id: number) {
    const route = await this.routeRepository
      .createQueryBuilder('route')
      .where('route.id=:id', { id })
      .select([
        'route.id',
        'route.routes',
        'route.name',
        'route.mainPage',
        'route.createTime',
        'route.updateTime',
      ])
      .getOne();

    route.routes = JSON.parse(route.routes);

    return route;
  }

  async update(id: number, updateRouteDto: UpdateRouteDto) {
    const updateRoute = await this.routeRepository.findOneBy({ id });

    updateRoute.routes = JSON.stringify(updateRouteDto.routes);
    updateRoute.name = updateRouteDto.name;
    updateRoute.mainPage = updateRouteDto.mainPage;

    if (updateRoute.mainPage) await this.validMainPage();

    return this.routeRepository.save(updateRoute);
  }

  async remove(id: number) {
    const deleteRoute = await this.routeRepository.findOneBy({ id });

    deleteRoute.isDelete = true;

    return this.routeRepository.save(deleteRoute);
  }
}
