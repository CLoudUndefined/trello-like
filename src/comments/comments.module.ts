import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { CardsModule } from 'src/cards/cards.module';
import { UsersModule } from 'src/users/users.module';
import { CommentOwnerGuard } from './guards/comment-owner.guard';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), CardsModule, UsersModule, ColumnsModule],
    providers: [CommentsService, CommentOwnerGuard],
    controllers: [CommentsController],
    exports: [CommentsService],
})
export class CommentsModule {}
