import { ComponentDto } from './component.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateComponentDto extends OmitType(ComponentDto, ['id']) {}
