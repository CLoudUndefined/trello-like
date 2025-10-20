import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the user.',
    })
    id: number;

    @ApiProperty({
        example: 'test@example.com',
        description: 'The email address of the user.',
    })
    email: string;

    @ApiProperty({
        example: '2025-10-18T12:34:56.000Z',
        description: 'The timestamp when the card was created.',
    })
    createdAt: Date;
}
