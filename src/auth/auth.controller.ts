import { Controller, Post, Body, BadRequestException, InternalServerErrorException, HttpCode, HttpStatus, UnauthorizedException, UseGuards, Res, Req, Request, Get, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { isInstance } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express'; // Import from express, not @nestjs/common
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService: JwtService) { }

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
    return this.authService.logout(req.user, token);
  }


  @UseGuards(JwtAuthGuard)
  @Get("user")
  async getUser(@Request() req) {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token
    if (token) {
      const decoded = jwt.decode(token);  // Decode token without verifying
      console.log('Decoded token:', decoded);  // Log token payload (including exp)
    }
    console.log('User from JWT:', req.user);  // Add logging to check the user object
    return this.authService.findUserById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put("user")
  async updateUser(@Request() req, @Body() userData: { username?: string; email?: string; password?: string }) {
    const userId = req.user.userId;
    if(!userId) throw new UnauthorizedException('User not AUTHENTICATED');
    console.log('Token from request:', req.headers['authorization']); 
    console.log('User from JWT in updateUser:', req.user);
    if(!req.user) throw new UnauthorizedException('User not AUTHENTICATED');
    return this.authService.updateUser(userId, userData);
  }


}
