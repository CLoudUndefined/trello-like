import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './cards.entity';
import { Repository } from 'typeorm';
import { ColumnsService } from 'src/columns/columns.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Card)
        private cardRepository: Repository<Card>,
        private columnService: ColumnsService,
    ) {}

    async create(columnId: number, createCardDto: CreateCardDto): Promise<Card> {
        const column = await this.columnService.findOne(columnId);

        const card = this.cardRepository.create({
            title: createCardDto.title,
            description: createCardDto.description || null,
            tags: createCardDto.tags || null,
            column,
        });
        return await this.cardRepository.save(card);
    }

    async findAll(columnId: number): Promise<Card[]> {
        return await this.cardRepository.find({
            where: { column: { id: columnId } },
        });
    }

    async findOne(id: number, loadRelations: boolean = false): Promise<Card> {
        const card = await this.cardRepository.findOne({
            where: { id },
            relations: loadRelations ? { column: { user: true } } : undefined,
        });

        if (!card) {
            throw new NotFoundException(`Card with ID ${id} not found`);
        }
        return card;
    }

    async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
        const card = await this.findOne(id);

        if (updateCardDto.title !== undefined) card.title = updateCardDto.title;
        if (updateCardDto.description !== undefined) card.description = updateCardDto.description;
        if (updateCardDto.tags !== undefined) card.tags = updateCardDto.tags;

        return await this.cardRepository.save(card);
    }

    async remove(id: number): Promise<void> {
        const card = await this.findOne(id);
        await this.cardRepository.remove(card);
    }
}
