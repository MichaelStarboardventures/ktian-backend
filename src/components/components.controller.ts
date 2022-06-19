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
import { ComponentsService } from './components.service';
import {
  CreateComponentDto,
  UpdateComponentDto,
  ComponentDto,
  ListDto,
} from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/components')
@ApiTags('Components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  @ApiOperation({ summary: 'create a component ' })
  @ApiResponse({ status: 201, type: ComponentDto })
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentsService.create(createComponentDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all component ' })
  @ApiResponse({ status: 200, type: [ComponentDto] })
  findAll(@Query() listDto: ListDto) {
    return this.componentsService.findAll(listDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a component ' })
  @ApiResponse({ status: 200, type: ComponentDto })
  findOne(@Param('id') id: string) {
    return this.componentsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update a component ' })
  @ApiResponse({ status: 200, type: ComponentDto })
  update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    return this.componentsService.update(+id, updateComponentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a component ' })
  @ApiResponse({ status: 200, type: ComponentDto })
  remove(@Param('id') id: string) {
    return this.componentsService.remove(+id);
  }
}
