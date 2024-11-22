import { Controller, Post, Body, BadRequestException, InternalServerErrorException, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { isInstance } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.authService.register(registerDto);
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An error occurred during registration');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      console.log('Login result:', result);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw new InternalServerErrorException('An error occurred during login');
    }
  }
}
