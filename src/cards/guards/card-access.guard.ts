import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { CardsService } from '../cards.service';
import { AuthenticatedRequest } from 'src/types/authenticated-request';

@Injectable()
export class CardAccessGuard implements CanActivate {
    constructor(private readonly cardsService: CardsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const requestUser = request.user;
        const cardIdFromParams = Number(request.params.cardId);

        if (!cardIdFromParams) {
            return true;
        }

        const card = await this.cardsService.findOne(cardIdFromParams, true);

        if (card.column.user.id !== requestUser.id) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
