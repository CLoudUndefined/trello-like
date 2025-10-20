import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class ColumnResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the column.',
    })
    id: number;

    @ApiProperty({ example: 'To Do', description: 'The title of the column.' })
    title: string;

    @ApiProperty({
        example: '2025-10-18T12:34:56.000Z',
        description: 'The timestamp when the column was created.',
    })
    createdAt: Date;

    @ApiProperty({ required: false, type: UserResponseDto })
    user?: UserResponseDto;
}
