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
import { RoutesService } from './routes.service';
import { CreateRouteDto, UpdateRouteDto, RouteDto, ListDto } from './dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/routes')
@ApiTags('Routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  @ApiOperation({ summary: 'create a route' })
  @ApiResponse({ status: 201, type: RouteDto })
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all route' })
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'pageSize', required: true })
  @ApiResponse({ status: 200, type: [RouteDto] })
  findAll(@Query() listDto: ListDto) {
    return this.routesService.findAll(listDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a route' })
  @ApiResponse({ status: 200, type: RouteDto })
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update a route' })
  @ApiResponse({ status: 200, type: RouteDto })
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a route' })
  @ApiResponse({ status: 200, type: RouteDto })
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}
