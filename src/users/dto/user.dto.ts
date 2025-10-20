import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'User email address.',
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    @MaxLength(255, { message: 'Email must not exceed 255 characters' })
    email: string;

    @ApiProperty({
        example: 'MySecurePassword123',
        description: 'User password (min 12 characters).',
        minLength: 12,
    })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(12, { message: 'Password must be at least 12 characters long' })
    @MaxLength(255, { message: 'Password must not exceed 255 characters' })
    password: string;
}
