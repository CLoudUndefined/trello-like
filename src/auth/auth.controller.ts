import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered.',
        type: UserResponseDto,
    })
    @ApiResponse({ status: 400, description: 'Bad Request (validation error).' })
    @Post('register')
    async register(@Body() authDto: AuthDto) {
        return await this.authService.register(authDto);
    }

    @ApiOperation({ summary: 'Log in an existing user' })
    @ApiResponse({
        status: 201,
        description: 'User successfully logged in, returns access token.',
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    @Post('login')
    async login(@Body() authDto: AuthDto) {
        return await this.authService.login(authDto);
    }
}
