import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { Repository } from 'typeorm';
import { CardsService } from 'src/cards/cards.service';
import { CommentDto } from './dto/comment.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        private cardService: CardsService,
        private userService: UsersService,
    ) {}

    async create(cardId: number, userId: number, commentDto: CommentDto): Promise<Comment> {
        const user = await this.userService.findOne(userId);
        const card = await this.cardService.findOne(cardId);

        const comment = this.commentRepository.create({
            text: commentDto.text,
            card,
            user,
        });

        return await this.commentRepository.save(comment);
    }

    async findAll(cardId: number): Promise<Comment[]> {
        return await this.commentRepository.find({
            where: { card: { id: cardId } },
        });
    }

    async findOne(id: number, loadRelations: boolean = false): Promise<Comment> {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: loadRelations ? { user: true } : undefined,
        });

        if (!comment) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }

        return comment;
    }

    async update(id: number, commentDto: CommentDto): Promise<Comment> {
        const comment = await this.findOne(id);
        comment.text = commentDto.text;
        return await this.commentRepository.save(comment);
    }

    async remove(id: number): Promise<void> {
        const comment = await this.findOne(id);
        await this.commentRepository.remove(comment);
    }
}
