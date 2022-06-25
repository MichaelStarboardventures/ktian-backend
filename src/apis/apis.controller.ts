import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ApisService } from './apis.service';
import { CreateApiDto, UpdateApiDto, ListDto, ApiDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/apis')
@ApiTags('Apis')
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Post()
  @ApiOperation({ summary: 'create api' })
  @ApiResponse({ status: 201, type: ApiDto })
  create(@Body() createApiDto: CreateApiDto) {
    return this.apisService.create(createApiDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all api' })
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'pageSize', required: true })
  @ApiResponse({ status: 200, type: [ApiDto] })
  findAll(@Query() listDto: ListDto) {
    return this.apisService.findAll(listDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get an api' })
  @ApiResponse({ status: 200, type: ApiDto })
  findOne(@Param('id') id: string) {
    return this.apisService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update an api' })
  @ApiResponse({ status: 200, type: ApiDto })
  update(@Param('id') id: string, @Body() updateApiDto: UpdateApiDto) {
    return this.apisService.update(+id, updateApiDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete an api' })
  @ApiResponse({ status: 200, type: ApiDto })
  remove(@Param('id') id: string) {
    return this.apisService.remove(+id);
  }
}
