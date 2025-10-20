import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ColumnDto } from './dto/column.dto';
import { ColumnOwnerGuard } from 'src/columns/guards/column-owner.guard';
import { UserAccessGuard } from 'src/users/guards/user-access.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnResponseDto } from './dto/column-response.dto';

@ApiTags('Columns')
@ApiBearerAuth('JWT-auth')
@Controller()
export class ColumnsController {
    constructor(private columnsService: ColumnsService) {}

    @ApiOperation({ summary: 'Create a new column' })
    @ApiResponse({
        status: 201,
        description: 'The column has been successfully created.',
        type: ColumnResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({
        status: 403,
        description: 'Forbidden. You can only create columns for yourself.',
    })
    @UseGuards(JwtAuthGuard, UserAccessGuard)
    @Post('users/:userId/columns')
    async create(@Param('userId', ParseIntPipe) userId: number, @Body() columnDto: ColumnDto) {
        return await this.columnsService.create(userId, columnDto);
    }

    @ApiOperation({ summary: 'Get all columns for a user' })
    @ApiResponse({
        status: 200,
        description: 'Return all columns for the user.',
        type: [ColumnResponseDto],
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({
        status: 403,
        description: 'Forbidden. You can only access your own columns.',
    })
    @UseGuards(JwtAuthGuard, UserAccessGuard)
    @Get('users/:userId/columns')
    async findAll(@Param('userId', ParseIntPipe) userId: number) {
        return await this.columnsService.findAllByUser(userId);
    }

    @ApiOperation({ summary: 'Get a single column by ID' })
    @ApiResponse({
        status: 200,
        description: 'Return the column.',
        type: ColumnResponseDto,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'Column not found.' })
    @UseGuards(JwtAuthGuard, ColumnOwnerGuard)
    @Get('columns/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.columnsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a column' })
    @ApiResponse({
        status: 200,
        description: 'The column has been successfully updated.',
        type: ColumnResponseDto,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'Column not found.' })
    @UseGuards(JwtAuthGuard, ColumnOwnerGuard)
    @Put('columns/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() columnDto: ColumnDto) {
        return await this.columnsService.update(id, columnDto);
    }

    @ApiOperation({ summary: 'Delete a column' })
    @ApiResponse({
        status: 200,
        description: 'The column has been successfully deleted.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'Column not found.' })
    @UseGuards(JwtAuthGuard, ColumnOwnerGuard)
    @Delete('columns/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.columnsService.remove(id);
        return { message: 'Column deleted' };
    }
}
