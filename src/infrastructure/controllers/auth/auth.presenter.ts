import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class IsAuthPresenter {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  @ApiProperty()
  lastLogin: Date;
}
