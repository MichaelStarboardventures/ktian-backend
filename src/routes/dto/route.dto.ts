import { ApiProperty } from '@nestjs/swagger';

export enum MainPage {
  False,
  True,
}

export class Route {
  @ApiProperty({
    type: String,
    description: 'route name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'route path',
  })
  path: string;

  @ApiProperty({
    type: String,
    description: 'route content',
  })
  content: string;
}

export class RouteDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: String,
    description: 'route page name',
  })
  name: string;

  @ApiProperty({
    type: [Route],
    description: 'route collect',
  })
  routes: Route[];

  @ApiProperty({
    enum: MainPage,
    default: 0,
  })
  mainPage: 0 | 1;
}
