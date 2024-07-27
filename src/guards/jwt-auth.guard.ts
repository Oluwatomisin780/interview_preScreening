import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/payload.type';

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret_key',
    });
  }
  async validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
