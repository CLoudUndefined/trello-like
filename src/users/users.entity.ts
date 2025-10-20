import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardColumn } from '../columns/columns.entity';
import { Comment } from '../comments/comments.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the user.',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'test@example.com',
        description: 'The email address of the user.',
    })
    @Column('varchar', { unique: true, length: 255 })
    email: string;

    @Column('varchar', { length: 255 })
    @Exclude()
    password: string;

    @ApiProperty({
        example: '2025-10-18T12:34:56.000Z',
        description: 'The timestamp when the user was created.',
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ required: false, type: () => [BoardColumn] })
    @OneToMany(() => BoardColumn, (column) => column.user)
    columns: BoardColumn[];

    @ApiProperty({ required: false, type: () => [Comment] })
    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}
