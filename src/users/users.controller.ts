import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'Return an array of users.',
        type: [UserResponseDto],
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @ApiOperation({ summary: 'Get a single user by ID' })
    @ApiResponse({
        status: 200,
        description: 'Return the user.',
        type: UserResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({
        status: 200,
        description: 'User successfully updated.',
        type: UserResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.update(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: 200, description: 'User successfully deleted.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.usersService.remove(id);
        return { message: 'User deleted' };
    }
}
