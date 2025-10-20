import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/types/authenticated-request';

@Injectable()
export class UserAccessGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const requestUser = request.user;
        const userIdFromParams = Number(request.params.userId);

        if (!userIdFromParams) {
            return true;
        }

        if (userIdFromParams !== requestUser.id) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
