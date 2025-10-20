import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        required: false,
        example: 'newuser@example.com',
        description: 'User email address.',
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsOptional()
    @MaxLength(255, { message: 'Email must not exceed 255 characters' })
    email?: string;

    @ApiProperty({
        required: false,
        example: 'MyNewSecurePassword123',
        description: 'User password (min 12 characters).',
    })
    @IsString({ message: 'Password must be a string' })
    @IsOptional()
    @MinLength(12, { message: 'Password must be at least 12 characters long' })
    @MaxLength(255, { message: 'Password must not exceed 255 characters' })
    password?: string;
}
