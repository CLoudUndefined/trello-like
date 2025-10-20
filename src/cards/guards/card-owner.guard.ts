import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { CardsService } from '../cards.service';
import { AuthenticatedRequest } from 'src/types/authenticated-request';

@Injectable()
export class CardOwnerGuard implements CanActivate {
    constructor(private readonly cardsService: CardsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const user = request.user;
        const cardId = Number(request.params.id);

        if (!cardId) {
            return true;
        }

        const card = await this.cardsService.findOne(cardId, true);

        if (card.column.user.id !== user.id) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
