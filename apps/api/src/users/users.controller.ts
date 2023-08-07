import { Controller, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('/:id')
  view(@Param('id') userId: string) {
    return this.userService.view(parseInt(userId));
  }
}
