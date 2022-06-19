import { ApiProperty } from '@nestjs/swagger';

export enum MainPage {
  False,
  True,
}

export class PageDto {
  @ApiProperty({
    type: String,
    description: 'Page string data',
  })
  readonly data: string;

  @ApiProperty({
    type: String,
    description: 'Page title',
  })
  readonly title: string;

  @ApiProperty({
    type: String,
    description: 'Page description',
  })
  readonly description: string;

  @ApiProperty({
    default: false,
    type: Boolean,
    description: 'Deleted or not',
  })
  readonly isDelete: boolean;

  @ApiProperty({
    default: 0,
    enum: [0, 1],
    description: 'Define as home page',
  })
  readonly mainPage: MainPage;
}
