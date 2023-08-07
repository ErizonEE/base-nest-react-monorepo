import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private database: DatabaseService) {}

  async view(userId: number) {
    const user = await this.database.user.findUnique({
      where: { id: userId },
    });

    const { hashedPassword, hashedRefreshToken, ...userCleaned } = user;

    return userCleaned;
  }
}
