import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PageService } from './pages.service';
import { CreatePageDto, UpdatePageDto, ListDTO, PageDto } from './dto';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/pages')
@ApiTags('Pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @ApiOperation({ summary: 'create a page' })
  @ApiResponse({ status: 200, type: PageDto })
  create(@Body() createPageDto: CreatePageDto) {
    return this.pageService.create(createPageDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all page' })
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'pageSize', required: true })
  @ApiResponse({ status: 200, type: [PageDto] })
  findAll(@Query() listDto: ListDTO) {
    return this.pageService.findAll(listDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a page' })
  @ApiResponse({ status: 200, type: PageDto })
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update a page' })
  @ApiResponse({ status: 200, type: PageDto })
  update(@Body() updatePageDto: UpdatePageDto, @Param('id') id: string) {
    return this.pageService.update(updatePageDto, +id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a page' })
  @ApiResponse({ status: 200, type: PageDto })
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  }
}
