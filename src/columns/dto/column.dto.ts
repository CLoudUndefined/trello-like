import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ColumnDto {
    @ApiProperty({
        example: 'In Progress',
        description: 'Title of the column.',
    })
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    @MaxLength(255, {
        message: 'Title must be shorter than or equal to 255 characters',
    })
    title: string;
}
