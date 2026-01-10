import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];  // Get token from 'Authorization' header
    if (token) {
      try {
        const decoded = this.jwtService.verifyAsync(token);  // Verify token
        request.user = decoded;  // Attach decoded user to request
      } catch (err) {
        console.log('Token verification failed:', err);
        throw new UnauthorizedException('Token verification failed');
      }
    }
    return super.canActivate(context);
  }
}