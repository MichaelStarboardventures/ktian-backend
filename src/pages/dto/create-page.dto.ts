import { OmitType } from '@nestjs/swagger';
import { PageDto } from './page.dto';

export class CreatePageDto extends OmitType(PageDto, ['isDelete', 'id']) {}
