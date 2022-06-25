import { ApiProperty } from '@nestjs/swagger';

export enum Custom {
  False,
  True,
}

export class ApiDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: String, description: 'Apis name' })
  name: string;

  @ApiProperty({ type: String, description: 'Apis url' })
  url: 'string';

  @ApiProperty({
    default: false,
    type: Boolean,
    description: 'Deleted or not',
  })
  isDelete: boolean;

  @ApiProperty({
    default: 0,
    description: 'Is it custom',
  })
  custom: 0 | 1;

  @ApiProperty({
    default: [],
    description: 'Render component',
  })
  components: string[];
}
