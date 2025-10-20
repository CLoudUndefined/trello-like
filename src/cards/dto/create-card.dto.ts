import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCardDto {
    @ApiProperty({
        example: 'Implement auth feature',
        description: 'Title of the card.',
    })
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    @MaxLength(255, {
        message: 'Title must be shorter than or equal to 255 characters',
    })
    title: string;

    @ApiProperty({
        required: false,
        example: 'Implement using Passport.js and JWT',
        description: 'Description of the task.',
    })
    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description?: string;

    @ApiProperty({
        required: false,
        example: 'backend,auth',
        description: 'Comma-separated list of tags.',
    })
    @IsString({ message: 'Tags must be a string' })
    @IsOptional()
    @MaxLength(500, {
        message: 'Tags must be shorter than or equal to 500 characters',
    })
    tags?: string;
}
