import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardColumn } from './columns.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ColumnDto } from './dto/column.dto';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(BoardColumn)
        private columnRepository: Repository<BoardColumn>,
        private userService: UsersService,
    ) {}

    async create(userId: number, columnDto: ColumnDto): Promise<BoardColumn> {
        const user = await this.userService.findOne(userId);
        const column = this.columnRepository.create({
            title: columnDto.title,
            user,
        });

        return await this.columnRepository.save(column);
    }

    async findAllByUser(userId: number): Promise<BoardColumn[]> {
        return await this.columnRepository.find({
            where: { user: { id: userId } },
        });
    }

    async findOne(id: number, loadRelations: boolean = false): Promise<BoardColumn> {
        const column = await this.columnRepository.findOne({
            where: { id },
            relations: loadRelations ? { user: true } : undefined,
        });

        if (!column) {
            throw new NotFoundException(`Column with ID ${id} not found`);
        }

        return column;
    }

    async update(id: number, columnDto: ColumnDto): Promise<BoardColumn> {
        const column = await this.findOne(id);
        column.title = columnDto.title;
        return await this.columnRepository.save(column);
    }

    async remove(id: number): Promise<void> {
        const column = await this.findOne(id);
        await this.columnRepository.remove(column);
    }
}
