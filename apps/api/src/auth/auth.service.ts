import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { DatabaseService } from 'src/database/database.service';
import { SingupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { SinginDto } from './dto/signin.dto';
import { Tokens } from './types/tokens.type';

@Injectable()
export class AuthService {
  constructor(
    private database: DatabaseService,
    private jwtService: JwtService,
  ) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        expiresIn: 60 * 120,
        secret: 'some-access-secret-key', // TODO: USE REAL SECRET KEY
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        expiresIn: 60 * 60 * 24 * 7,
        secret: 'some-refresh-secret-key', // TODO: USE REAL SECRET KEY
      },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(userId: number, refreshTokenHash: string) {
    const hashedToken = await this.hashData(refreshTokenHash);

    await this.database.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hashedToken,
      },
    });
  }

  async signupLocal(signup: SingupDto) {
    const newUser = await this.database.user.create({
      data: {
        name: signup.name,
        email: signup.email,
        hashedPassword: await this.hashData(signup.password),
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);

    return tokens;
  }
  async signinLocal(sign: SinginDto): Promise<Tokens> {
    const user = await this.database.user.findUnique({
      where: {
        email: sign.email,
      },
    });

    console.log(user);
    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(
      sign.password,
      user.hashedPassword,
    );

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number) {
    await this.database.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.database.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRefreshToken) throw new ForbiddenException();

    const isRTMatch = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!isRTMatch) throw new ForbiddenException();

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
  }
}
