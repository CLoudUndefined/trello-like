import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { CommentsService } from '../comments.service';
import { AuthenticatedRequest } from 'src/types/authenticated-request';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
    constructor(private readonly commentsService: CommentsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const user = request.user;
        const commentId = Number(request.params.id);

        if (!commentId) {
            return true;
        }

        const comment = await this.commentsService.findOne(commentId, true);

        if (comment.user.id !== user.id) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
