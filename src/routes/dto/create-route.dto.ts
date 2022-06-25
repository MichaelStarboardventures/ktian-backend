import { OmitType } from '@nestjs/swagger';
import { RouteDto } from './route.dto';

export class CreateRouteDto extends OmitType(RouteDto, ['id']) {}
