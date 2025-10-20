import { Card } from 'src/cards/cards.entity';
import { User } from 'src/users/users.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class Comment {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the comment.',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'What is the deadline for this task?',
        description: 'The text content of the comment.',
    })
    @Column('text')
    text: string;

    @ApiProperty({
        example: '2025-10-18T12:34:56.000Z',
        description: 'The timestamp when the comment was created.',
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ required: false, type: () => Card })
    @ManyToOne(() => Card, (card) => card.comments, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    card: Card;

    @ApiProperty({ required: false, type: () => User })
    @ManyToOne(() => User, (user) => user.comments, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    user: User;
}
