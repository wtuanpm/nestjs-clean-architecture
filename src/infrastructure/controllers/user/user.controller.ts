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
import { CurrentUser } from 'src/infrastructure/common/decorators/user.decorator';
import { UserM } from 'src/domain/model/user';

@Controller('user')
@ApiTags('User')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.USER_USECASE_PROXY)
    private readonly userUsecaseProxy: UseCaseProxy<UserUsecase>,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'me' })
  async getMe(@CurrentUser() user: UserM) {
    return this.userUsecaseProxy.getInstance().getUserById(user._id);
  }
}
