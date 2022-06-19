import { ApiProperty } from '@nestjs/swagger';

export class ListDto {
  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  pageSize: number;
}
