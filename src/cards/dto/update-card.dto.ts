import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCardDto {
    @ApiProperty({
        required: false,
        example: 'Implement auth feature (updated)',
        description: 'New title for the card.',
    })
    @IsString({ message: 'Title must be a string' })
    @IsOptional()
    @MaxLength(255, {
        message: 'Title must be shorter than or equal to 255 characters',
    })
    title?: string;

    @ApiProperty({
        required: false,
        example: 'Update docs for Passport.js implementation',
        description: 'New description for the card.',
    })
    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description?: string;

    @ApiProperty({
        required: false,
        example: 'backend,auth,docs',
        description: 'New comma-separated list of tags.',
    })
    @IsString({ message: 'Tags must be a string' })
    @IsOptional()
    @MaxLength(500, {
        message: 'Tags must be shorter than or equal to 500 characters',
    })
    tags?: string;
}
