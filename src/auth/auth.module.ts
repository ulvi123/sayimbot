import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('SECRET_KEY');
        console.log('JWT Secret in AuthModule (from ConfigService):', secret);
        console.log('JWT Secret from process.env:', process.env.SECRET_KEY);
        console.log('JWT Secret in AuthModule:', secret); // For debugging
        if (!secret) {
          throw new Error('SECRET_KEY is not defined');
        }
        return {
          secret: secret,
          signOptions: { expiresIn: '3153600000s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy,PrismaService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule,PrismaService],
})
export class AuthModule {}