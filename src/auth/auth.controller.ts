import { Controller, Post, Body, BadRequestException, InternalServerErrorException, HttpCode, HttpStatus, UnauthorizedException, UseGuards, Res, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { isInstance } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express'; // Import from express, not @nestjs/common
import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private jwtService: JwtService) { }

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




  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    console.log('Logout request received');
    console.log('Authorization header:', req.headers.authorization);
    console.log('User from request:', req.user);
    const token = req.headers.authorization?.split(' ')[1];
    return this.authService.logout(req.user,token);
  }
}
