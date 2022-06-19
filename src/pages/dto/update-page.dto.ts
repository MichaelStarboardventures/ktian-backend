import { CreatePageDto } from './create-page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdatePageDto extends PartialType(CreatePageDto) {}
