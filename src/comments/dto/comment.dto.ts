import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CommentDto {
    @ApiProperty({
        example: 'This task seems more complex than initially thought.',
        description: 'Comment text.',
    })
    @IsString({ message: 'Text must be a string' })
    @IsNotEmpty({ message: 'Text is required' })
    text: string;
}
