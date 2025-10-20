import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { ColumnsService } from '../columns.service';
import { AuthenticatedRequest } from 'src/types/authenticated-request';

@Injectable()
export class ColumnAccessGuard implements CanActivate {
    constructor(private readonly columnsService: ColumnsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const requestUser = request.user;
        const columnIdFromParams = Number(request.params.columnId);

        if (!columnIdFromParams) {
            return true;
        }

        const column = await this.columnsService.findOne(columnIdFromParams, true);

        if (column.user.id !== requestUser.id) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
