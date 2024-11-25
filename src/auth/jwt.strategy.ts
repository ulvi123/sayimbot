import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    try {
      console.log('Attempting to validate JWT payload:', payload);
      if (typeof payload !== 'object' || payload === null) {
        throw new UnauthorizedException('Invalid token payload');
      }
      return { userId: payload.sub, email: payload.email };
    } catch (error) {
      console.error('Error validating JWT:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}