import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';


@Injectable()
export class AuthService {
  private users: any[] = [];

  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;


    const existingUser = await this.prisma.user.findFirst(
      {
        where: {
          OR: [{ username }, { email }],
        },
      }
    );
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    try {
      const newUser = await this.prisma.user.create({
        data: {
          username,
          email,
          password: await bcrypt.hash(password, 10),
        },
      })

      const { password: _, ...result } = newUser;
      return result
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to register user');
    }


  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    console.log('Attempting login for:', email);
  
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
  
    console.log('Login successful, token generated');
    return { 
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    };
  }


}
