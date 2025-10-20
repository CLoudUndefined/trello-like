import { BoardColumn } from 'src/columns/columns.entity';
import { Comment } from 'src/comments/comments.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cards')
export class Card {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the card.',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Design the homepage',
        description: 'The title of the card.',
    })
    @Column('varchar', { length: 255 })
    title: string;

    @ApiProperty({
        required: false,
        nullable: true,
        example: 'Create a mockup in Figma',
        description: 'A detailed description of the task.',
    })
    @Column('text', { nullable: true })
    description: string | null;

    @ApiProperty({
        required: false,
        nullable: true,
        example: 'design,ux,high-priority',
        description: 'Comma-separated tags for the card.',
    })
    @Column('varchar', { nullable: true, length: 500 })
    tags: string | null;

    @ApiProperty({
        example: '2025-10-18T12:34:56.000Z',
        description: 'The timestamp when the card was created.',
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ required: false, type: () => [Comment] })
    @OneToMany(() => Comment, (comment) => comment.card)
    comments: Comment[];

    @ApiProperty({ required: false, type: () => BoardColumn })
    @ManyToOne(() => BoardColumn, (column) => column.cards, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    column: BoardColumn;
}
