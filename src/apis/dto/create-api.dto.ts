import { ApiDto } from './api.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateApiDto extends OmitType(ApiDto, ['id']) {}
