import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SingupDto } from './dto/signup.dto';
import { Tokens } from './types/tokens.type';
import { AuthGuard } from '@nestjs/passport';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import { sign } from 'crypto';
import { SinginDto } from './dto/signin.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('/local/signup')
  async signupLocal(@Body() credentials: SingupDto): Promise<Tokens> {
    return this.authService.signupLocal(credentials);
  }

  @PublicRoute()
  @Post('/local/signin')
  signinLocal(@Body() sign: SinginDto) {
    return this.authService.signinLocal(sign);
  }

  @Post('/logout')
  logout(@GetCurrentUserId() userId: number) {
    this.authService.logout(userId);
  }

  @PublicRoute()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  refreshTokens(@Req() req: Request) {
    const user = req.user;

    return this.authService.refreshTokens(user['sub'], user['refreshToken']);
  }
}
