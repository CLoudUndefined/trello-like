import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { ColumnsService } from 'src/columns/columns.service';
import { AuthenticatedRequest } from 'src/types/authenticated-request';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
    constructor(private readonly columnsService: ColumnsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const user = request.user;
        const columnId = Number(request.params.id);

        if (!columnId) {
            return true;
        }

        const column = await this.columnsService.findOne(columnId, true);

        if (column.user.id !== user.id) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
