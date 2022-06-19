import { Injectable } from '@nestjs/common';
import { Page } from './entities/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListDTO, UpdatePageDto, CreatePageDto } from './dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async validMainPage() {
    const page = await this.pageRepository
      .createQueryBuilder('page')
      .where('page.mainPage=:mainPage', { mainPage: 1 })
      .select(['page.mainPage', 'page.id'])
      .getOne();

    if (!page) return;

    page.mainPage = 0;

    await this.pageRepository.save(page);
  }

  async create(createPageDto: CreatePageDto) {
    const page = new Page();
    page.data = createPageDto.data;
    page.title = createPageDto.title;
    page.description = createPageDto.description;
    page.mainPage = createPageDto.mainPage;

    if (createPageDto.mainPage) await this.validMainPage();

    return await this.pageRepository.save(page);
  }

  async findAll(listDto: ListDTO) {
    const { page = 1, pageSize = 10, mainPage = 0 } = listDto;

    const where = Boolean(mainPage)
      ? { isDelete: false, mainPage: 1 }
      : { isDelete: false };

    const getList = this.pageRepository
      .createQueryBuilder('page')
      .where({ ...where })
      .select([
        'page.id',
        'page.data',
        'page.title',
        'page.description',
        'page.mainPage',
        'page.createTime',
        'page.updateTime',
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return await getList;
  }

  async findOne(id: number) {
    return await this.pageRepository
      .createQueryBuilder('page')
      .where('page.id=:id', { id })
      .select([
        'page.id',
        'page.data',
        'page.title',
        'page.description',
        'page.mainPage',
        'page.createTime',
        'page.updateTime',
      ])
      .getOne();
  }

  async update(updatePageDto: UpdatePageDto, id: number) {
    const { data } = updatePageDto;
    const updatePage = await this.pageRepository.findOneBy({ id });

    updatePage.data = data;
    updatePage.title = updatePageDto.title;
    updatePage.description = updatePageDto.description;
    updatePage.mainPage = updatePageDto.mainPage;

    if (updatePageDto.mainPage) await this.validMainPage();

    return this.pageRepository.save(updatePage);
  }

  async remove(id: number) {
    const deletePage = await this.pageRepository.findOneBy({ id });
    deletePage.isDelete = true;

    return this.pageRepository.save(deletePage);
  }
}
