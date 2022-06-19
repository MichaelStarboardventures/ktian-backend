import { CreateApiDto } from './create-api.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateApiDto extends PartialType(CreateApiDto) {}
