import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Card } from 'src/cards/cards.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('columns')
export class BoardColumn {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the column.',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'To Do', description: 'The title of the column.' })
    @Column('varchar', { length: 255 })
    title: string;

    @ApiProperty({
        example: '2025-10-18T12:34:56.000Z',
        description: 'The timestamp when the column was created.',
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ required: false, type: () => [Card] })
    @OneToMany(() => Card, (card) => card.column)
    cards: Card[];

    @ApiProperty({ required: false, type: () => User })
    @ManyToOne(() => User, (user) => user.columns, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    user: User;
}
