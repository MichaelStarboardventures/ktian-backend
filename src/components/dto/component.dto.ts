import { ApiProperty } from '@nestjs/swagger';

export class ComponentDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: String, description: 'Component name' })
  name: string;

  @ApiProperty({ type: String, description: 'Component type' })
  type: string;
}
