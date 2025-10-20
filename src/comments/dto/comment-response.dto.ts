import { ApiProperty } from '@nestjs/swagger';
import { CardResponseDto } from 'src/cards/dto/card-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class CommentResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the comment.',
    })
    id: number;

    @ApiProperty({
        example: 'What is the deadline?',
        description: 'The text content of the comment.',
    })
    text: string;

    @ApiProperty({
        example: '2025-10-18T12:34:56.000Z',
        description: 'The timestamp when the card was created.',
    })
    createdAt: Date;

    @ApiProperty({ required: false, type: CardResponseDto })
    card?: CardResponseDto;

    @ApiProperty({ required: false, type: UserResponseDto })
    user?: UserResponseDto;
}
