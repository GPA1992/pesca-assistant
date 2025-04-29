import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ContextService } from '../contexts/context.service';
import { decode, JwtPayload } from 'jsonwebtoken';

@Injectable()
export class TenantIdMiddleware implements NestMiddleware {
  constructor(private readonly contextService: ContextService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1];
    const headerTenantId = req.headers['x-tenant-id'] as string;

    if (!token) {
      throw new UnauthorizedException('Authorization token missing');
    }

    const decoded = this.decodeToken(token);

    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    let tenantId = decoded?.tenant_id as string;

    if (headerTenantId && headerTenantId !== tenantId) {
      tenantId = headerTenantId;
    }

    if (!tenantId) {
      throw new UnauthorizedException('Tenant ID not found');
    }

    this.contextService.setContext({ tenantId });
    next();
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      const decoded = decode(token);
      if (typeof decoded === 'object' && decoded !== null) {
        return decoded;
      }
      console.error('Decoded token is not a valid object:', decoded);
      return null;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }
}
