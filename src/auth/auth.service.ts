import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


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


  async logout(user: { userId: number; email: string }, token: string) {
    console.log('Logging out user:', user);

    // Get the current time
    const now = new Date();

    // Calculate the expiration time (e.g., 1 hour from now)
    // Decode the token to get its expiration time
    const decodedToken = this.jwtService.decode(token);
    const expiresAt = new Date(decodedToken['exp'] * 1000);

    try {
      // Blacklist the token
      await this.prisma.blacklistedToken.create({
        data: {
          userId: user.userId,
          token: token,
          expiresAt: expiresAt
        }
      })

      return { message: 'Logged out successfully' };
    } catch (error) {
      console.error('Error during logout:', error);
      throw new InternalServerErrorException('Failed to logout');
    }
  }

  async validateToken(token: string): Promise<boolean> {
    const blacklistedToken = await this.prisma.blacklistedToken.findUnique({
      where: { token },
    });

    return !blacklistedToken;
  }

}

