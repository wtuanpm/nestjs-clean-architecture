import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthLoginDto, RegisterDto } from '../auth/auth-dto.class';
import { IsAuthPresenter } from '../auth/auth.presenter';

import JwtRefreshGuard from '../../common/guards/jwtRefresh.guard';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { LoginGuard } from '../../common/guards/login.guard';

import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';

import { ApiResponseType } from '../../common/swagger/response.decorator';
import { AuthUsecase } from 'src/usecases/auth/auth.usecases';
import { UserUsecase } from 'src/usecases/auth/user.usecase';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,

    @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,

    @Inject(UsecasesProxyModule.AUTH_USECASE_PROXY)
    private readonly authUsecaseProxy: UseCaseProxy<AuthUsecase>,
  ) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Request() request: any) {
    return this.authUsecaseProxy.getInstance().login(request.user);
  }

  @Post('me')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async getMe(@Request() request: any) {
    return this.authUsecaseProxy.getInstance().login(request.user);
  }

  @Post('register')
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async register(@Body() body: RegisterDto, @Request() request: any) {
    return this.authUsecaseProxy.getInstance().register(body);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Request() request: any) {
    const cookie = await this.logoutUsecaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(@Req() request: any) {
    return 'Refresh successful';
  }
}
