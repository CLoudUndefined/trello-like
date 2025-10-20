import { ApiProperty } from '@nestjs/swagger';

export class CardResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the card.',
    })
    id: number;

    @ApiProperty({
        example: 'Design the homepage',
        description: 'The title of the card.',
    })
    title: string;

    @ApiProperty({
        required: false,
        nullable: true,
        example: 'Create a mockup in Figma',
        description: 'A detailed description of the task.',
    })
    description: string | null;

    @ApiProperty({
        required: false,
        nullable: true,
        example: 'design,ux',
        description: 'Comma-separated tags.',
    })
    tags: string | null;

    @ApiProperty({
        example: '2025-10-18T12:34:56.000Z',
        description: 'The timestamp when the card was created.',
    })
    createdAt: Date;
}
